<template>
  <div class="link-manager">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>链接</el-breadcrumb-item>
      <el-breadcrumb-item>所有链接</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 添加角色按钮区域 -->
      <el-row>
        <el-col>
          <el-button
            type="primary"
            @click="
              setLinkDialogVisible = true
              dialog_title = '添加链接'
            "
            >添加链接</el-button
          >
        </el-col>
      </el-row>
      <!-- 角色列表区域 -->
      <el-table :data="linklist" border stripe>
        <!-- 索引列 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="名称" width="180">
          <template slot-scope="scope">
            <el-link
              target="_blank"
              type="primary"
              @click="jumpSite(scope.$index, scope.row.siteurl)"
              >{{ scope.row.name }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="URL" width="280">
          <template slot-scope="scope">
            <el-link
              target="_blank"
              type="primary"
              @click="jumpSite(scope.$index, scope.row.siteurl)"
              >{{ scope.row.siteurl }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="link_type"
          label="分类目录"
          width="180"
        ></el-table-column>
        <el-table-column label="头像地址">
          <template slot-scope="scope">
            <el-link
              target="_blank"
              type="primary"
              @click="jumpSite(scope.$index, scope.row.avatar)"
              >{{ scope.row.avatar }}
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

    <!-- 添加链接分类的对话框 -->
    <el-dialog
      :title="dialog_title"
      :visible.sync="setLinkDialogVisible"
      width="50%"
      @close="setLinkDialogClosed"
    >
      <el-form
        label-position="right"
        label-width="80px"
        :model="addlink"
        ref="addlink"
        :rules="rules"
      >
        <el-form-item label="名字" prop="name">
          <el-input v-model="addlink.name"></el-input>
        </el-form-item>
        <el-form-item label="介绍" prop="description">
          <el-input v-model="addlink.description"></el-input>
        </el-form-item>
        <el-form-item label="主页地址" prop="siteurl">
          <el-input v-model="addlink.siteurl"></el-input>
        </el-form-item>
        <el-form-item label="头像地址" prop="avatar">
          <el-input v-model="addlink.avatar"></el-input>
        </el-form-item>
        <!-- 分类选择 -->
        <el-form-item label="分类选择" prop="link_type">
          <el-select v-model="addlink.link_type" placeholder="请选择">
            <el-option
              v-for="item in link_typelist"
              :key="item.link_id"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setLinkDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights('addlink')"
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
      //链接数组
      linklist: [],
      //链接分类数组
      link_typelist: [],
      // 控制分配权限对话框的显示与隐藏
      setLinkDialogVisible: false,
      dialog_title: '添加链接',
      //添加数据
      addlink: {
        name: '',
        description: '',
        siteurl: '',
        avatar: '',
        _id: '',
        link_type: ''
      },
      //校验规则
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        description: [
          { required: true, message: '请输入分类描述', trigger: 'blur' }
        ],
        siteurl: [
          { required: true, message: '请输入主页地址', trigger: 'blur' }
        ],
        avatar: [
          { required: true, message: '请输入头像地址', trigger: 'blur' }
        ],
        link_type: [
          { required: true, message: '请选择链接分类', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    //获取友链
    this.getLinklist()
    //获取友链分类
    this.findLink()
  },
  methods: {
    //查询友链
    getLinklist: async function() {
      const { status, data } = await this.$axios.get('/alink/getlink')
      if (status === 200) {
        if (data && data.code === 0) {
          this.$message({
            message: data.msg,
            type: 'success'
          })
          this.linklist = data.data
          console.log(this.linklist)
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
    //查询友链分类
    findLink: async function() {
      const { status, data } = await this.$axios.get('/alink/getlinkcategory')
      if (status === 200) {
        if (data && data.code === 0) {
          this.$message({
            message: data.msg,
            type: 'success'
          })
          this.link_typelist = data.data
          // console.log(this.link_typelist)
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
    //添加或更改友链
    allotRights: async function(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let apikey = ''
          if (this.dialog_title === '添加链接') {
            apikey = 'addlink'
          } else {
            apikey = 'updatelink'
          }
          const { status, data } = await this.$axios.post(
            `/alink/${apikey}`,
            this.addlink
          )
          console.log(data)
          if (status === 200) {
            if (data && data.code === 0) {
              this.$message({
                message: data.msg,
                type: 'success'
              })
              this.getLinklist()
              this.setLinkDialogClosed()
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
    setLinkDialogClosed: function() {
      this.addlink.name = ''
      this.addlink.description = ''
      this.addlink.siteurl = ''
      this.addlink.avatar = ''
      this.addlink._id = ''
      this.addlink.link_type = ''
    },
    //修改友链
    handleEdit: function(index, row) {
      console.log(index, row)
      this.dialog_title = '修改链接'
      this.addlink.name = row.name
      this.addlink.description = row.description
      this.addlink.siteurl = row.siteurl
      this.addlink.avatar = row.avatar
      this.addlink._id = row._id
      this.addlink.link_type = row.link_type
      this.setLinkDialogVisible = true
    },
    //删除链接
    handleDelete: async function(index, row) {
      console.log(index, row)
      // 弹框提示用户是否要删除
      const confirmResult = await this.$confirm(
        '此操作将永久删除该链接, 是否继续?',
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

      const { status, data } = await this.$axios.post('/alink/deletelink', {
        _id: row._id
      })
      if (status === 200) {
        if (data && data.code === 0) {
          this.$message({
            message: data.msg,
            type: 'success'
          })
          this.getLinklist()
          this.setLinkDialogClosed()
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
