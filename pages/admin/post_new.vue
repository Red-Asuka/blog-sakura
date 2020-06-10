<template>
  <div class="post_new">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容管理</el-breadcrumb-item>
      <el-breadcrumb-item>写文章</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <el-form
        label-position="top"
        label-width="80px"
        :model="addpost"
        ref="addpost"
        :rules="rules"
      >
        <el-form-item label="文章标题" prop="post_title">
          <el-input
            v-model="addpost.post_title"
            autosize
            placeholder="请输入文章标题"
            size="medium"
          ></el-input>
        </el-form-item>
        <!-- 分类选择 -->
        <el-form-item label="文章分类" prop="sort_id">
          <el-select v-model="addpost.sort_id" placeholder="请选择文章分类">
            <el-option
              v-for="item in post_typelist"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 标签选择 -->
        <el-form-item label="文章标签" prop="post_tags">
          <el-select
            v-model="addpost.post_tags"
            multiple
            placeholder="请选择文章标签"
          >
            <el-option
              v-for="item in post_taglist"
              :key="item._id"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item id="uploderitem" label="文章封面" prop="post_bg">
          <el-upload
            class="avatar-uploader"
            id="imguplad"
            action="/article/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="addpost.post_bg" :src="addpost.post_bg" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="文章描述" prop="post_description">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入文章描述"
            v-model="addpost.post_description"
          ></el-input>
        </el-form-item>
        <el-form-item label="文章内容（MarkDown语法）" prop="post_content">
          <!-- 文章编译器 -->
          <div class="mavonEditor">
            <no-ssr>
              <mavon-editor
                placeholder="...开始你的表演！"
                @save="ContentSave"
                @change="ContentSave"
              />
            </no-ssr>
          </div>
        </el-form-item>
      </el-form>
      <el-button class="commit" @click="allotRights(addpost)">{{
        this.btntext
      }}</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      btntext: '提交',
      //添加文章
      addpost: {
        post_title: '',
        sort_id: '',
        post_bg: '',
        post_description: '',
        post_content: '',
        post_tags: [],
        _id: ''
      },
      //校验规则
      rules: {
        post_title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ],
        sort_id: [
          { required: true, message: '请选择文章分类', trigger: 'blur' }
        ],
        post_tags: [
          { required: true, message: '请选择文章标签', trigger: 'blur' }
        ],
        post_bg: [
          { required: true, message: '请上传文章封面', trigger: 'blur' }
        ],
        post_description: [
          { required: true, message: '请输入文章描述', trigger: 'blur' }
        ],
        post_content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ]
      },
      //文章分类数组
      post_typelist: [],
      //文章标签数组
      post_taglist: []
    }
  },
  created() {
    //查询文章分类
    this.getPostType()
    //查询文章标签
    this.getPostTags()
  },
  methods: {
    //查询文章分类
    getPostType: async function() {
      const { status, data } = await this.$axios.get('/sorts/getsort')
      if (status === 200) {
        if (data && data.code === 0) {
          this.$message({
            message: data.msg,
            type: 'success'
          })
          this.post_typelist = data.data
          console.log(this.post_typelist)
        } else {
          this.$message({
            message: data.msg,
            type: 'error'
          })
        }
      } else {
        this.$message({
          message: `服务器出错，错误码:${status}`,
          type: 'error'
        })
      }
    },
    //查询文章标签
    getPostTags: async function() {
      const { status, data } = await this.$axios.get('/labels/getlabel')
      if (status === 200) {
        if (data && data.code === 0) {
          this.$message({
            message: data.msg,
            type: 'success'
          })
          this.post_taglist = data.data
          console.log(this.post_taglist)
        } else {
          this.$message({
            message: data.msg,
            type: 'error'
          })
        }
      } else {
        this.$message({
          message: `服务器出错，错误码:${status}`,
          type: 'error'
        })
      }
    },
    //文章内容保存
    ContentSave: function(value, render) {
      this.addpost.post_content = render
    },
    //文章提交
    allotRights: async function(formName) {
      // console.log(formName)
      //文章校验
      let flag = this.paramsValidate(formName)
      if (flag && formName.post_tags.length != 0) {
        let apikey = ''
        if (this.btntext === '提交') {
          apikey = 'addarticle'
        } else {
          apikey = 'updatearticle'
        }
        const { status, data } = await this.$axios.post(
          `/article/${apikey}`,
          this.addpost
        )
        if (status === 200) {
          if (data && data.code === 0) {
            this.$message({
              message: data.msg,
              type: 'success'
            })
            if (this.btntext != '更新') {
              this.addpost._id = data.data._id
            }
            this.btntext = '更新'
            console.log(data)
            console.log(this.addpost)
          } else {
            this.$message({
              message: data.msg,
              type: 'error'
            })
          }
        } else {
          this.$message({
            message: `服务器出错，错误码:${status}`,
            type: 'error'
          })
        }
      } else {
        console.log('提交失败!!')
        return false
      }
    },
    //校验判断
    paramsValidate: function(params) {
      let flag = true

      for (var key in params) {
        if (params[key] != '0' && !params[key] && key != '_id') {
          this.$message({
            message: `${key}不能为空`,
            type: 'error'
          })
          return false // 终止程序
        }
      }

      return flag
    },
    //返回上传的图片地址
    handleAvatarSuccess(res, file) {
      this.addpost.post_bg = URL.createObjectURL(file.raw)
    },
    //上传封面前检查
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isGIF = file.type === 'image/gif'
      const isPNG = file.type === 'image/png'
      const isBMP = file.type === 'image/bmp'

      if (!isJPG && !isGIF && !isPNG && !isBMP) {
        this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!')
        return false
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return (isJPG || isGIF || isPNG || isBMP) && isLt2M
    }
  }
}
</script>

<style scoped>
.commit {
  position: fixed;
  right: 10px;
  top: 20vh;
  color: #000;
  border-radius: 5%;
  width: 80px;
  text-align: center;
  z-index: 2000;
}
.v-note-wrapper {
  min-height: 800px;
}
.post_new .el-input {
  width: 300px;
}
#uploderitem {
  width: 180px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
#imguplad {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
#imguplad:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
</style>
