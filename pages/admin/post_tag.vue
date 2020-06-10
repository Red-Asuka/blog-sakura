<template>
  <div class="post_tag">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容管理</el-breadcrumb-item>
      <el-breadcrumb-item>标签</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 添加标签按钮区域 -->
      <el-row>
        <el-col>
          <el-button
            type="primary"
            @click="
              setLinkDialogVisible = true
              dialog_title = '添加标签'
            "
            >添加标签</el-button
          >
        </el-col>
      </el-row>
      <!-- 标签列表区域 -->
      <el-table :data="taglist" border stripe>
        <!-- 索引列 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="名称" width="180">
        </el-table-column>
        <el-table-column prop="alias" label="别名" width="180">
        </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>

        <el-table-column label="标签图像">
          <template slot-scope="scope">
            <el-link
              target="_blank"
              type="primary"
              @click="jumpSite(scope.$index, scope.row.tag_url)"
              >{{ scope.row.tag_url }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加/修改 标签的对话框 -->
    <el-dialog
      :title="dialog_title"
      :visible.sync="setLinkDialogVisible"
      width="50%"
      @close="setTagDialogClosed"
    >
      <el-form
        label-position="right"
        label-width="80px"
        :model="addtag"
        ref="addtag"
        :rules="rules"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="addtag.name"></el-input>
        </el-form-item>
        <el-form-item label="别名" prop="alias">
          <el-input v-model="addtag.alias"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="addtag.description"></el-input>
        </el-form-item>
        <el-form-item label="图像地址" prop="tag_url">
          <el-input v-model="addtag.tag_url"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setLinkDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights('addtag')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      //标签数组
      taglist: [],
      // 控制对话框的显示与隐藏
      setLinkDialogVisible: false,
      dialog_title: '添加标签',
      //添加数据
      addtag: {
        name: '',
        alias: '',
        description: '',
        tag_url: '',
        _id: ''
      },
      //校验规则
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getLabels()
  },
  methods: {
    //查询标签
    getLabels: async function() {
      const { status, data } = await this.$axios.get('/labels/getlabel')
      if (status === 200) {
        if (data && data.code === 0) {
          this.$message({
            message: data.msg,
            type: 'success'
          })
          this.taglist = data.data
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
    //添加或更改标签
    allotRights: async function(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let apikey = ''
          if (this.dialog_title === '添加标签') {
            apikey = 'addlabel'
          } else {
            apikey = 'updatelabels'
          }
          const { status, data } = await this.$axios.post(
            `/labels/${apikey}`,
            this.addtag
          )
          console.log(data)
          if (status === 200) {
            if (data && data.code === 0) {
              this.$message({
                message: data.msg,
                type: 'success'
              })
              this.getLabels()
              this.setTagDialogClosed()
              this.setLinkDialogVisible = false
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
          console.log('error submit!!')
          return false
        }
      })
    },
    //清空对话框数据
    setTagDialogClosed: function() {
      this.addtag.name = ''
      this.addtag.alias = ''
      this.addtag.description = ''
      this.addtag.tag_url = ''
      this.addtag._id = ''
    },
    //修改标签
    handleEdit: function(index, row) {
      console.log(index, row)
      this.dialog_title = '修改标签'
      this.addtag.name = row.name
      this.addtag.alias = row.alias
      this.addtag.description = row.description
      this.addtag.tag_url = row.tag_url
      this.addtag._id = row._id
      this.setLinkDialogVisible = true
    },
    //删除标签
    handleDelete: async function(index, row) {
      console.log(index, row)
      // 弹框提示用户是否要删除
      const confirmResult = await this.$confirm(
        '此操作将永久删除该标签, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message.info('取消了删除！')
      }

      const { status, data } = await this.$axios.post('/labels/deletelabels', {
        _id: row._id
      })
      if (status === 200) {
        if (data && data.code === 0) {
          this.$message({
            message: data.msg,
            type: 'success'
          })
          this.getLabels()
          this.setTagDialogClosed()
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
    //跳转链接
    jumpSite: async function(index, url) {
      console.log(index, url)
      window.open(url)
    }
  }
}
</script>

<style></style>
