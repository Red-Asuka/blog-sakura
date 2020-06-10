<template>
  <div class="post_category">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类目录</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 添加分类按钮区域 -->
      <el-row>
        <el-col>
          <el-button
            type="primary"
            @click="
              setSortDialogVisible = true
              dialog_title = '添加分类'
            "
            >添加分类</el-button
          >
        </el-col>
      </el-row>
      <!-- 分类列表区域 -->
      <el-table :data="sortlist" border stripe>
        <!-- 索引列 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="名称" width="180">
        </el-table-column>
        <el-table-column prop="alias" label="别名" width="180">
        </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>

        <el-table-column label="分类图像">
          <template slot-scope="scope">
            <el-link
              target="_blank"
              type="primary"
              @click="jumpSite(scope.$index, scope.row.sort_url)"
              >{{ scope.row.sort_url }}
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

    <!-- 添加/修改 分类的对话框 -->
    <el-dialog
      :title="dialog_title"
      :visible.sync="setSortDialogVisible"
      width="50%"
      @close="setSortDialogClosed"
    >
      <el-form
        label-position="right"
        label-width="80px"
        :model="addsort"
        ref="addsort"
        :rules="rules"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="addsort.name"></el-input>
        </el-form-item>
        <el-form-item label="别名" prop="alias">
          <el-input v-model="addsort.alias"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="addsort.description"></el-input>
        </el-form-item>
        <el-form-item label="图像地址" prop="sort_url">
          <el-input v-model="addsort.sort_url"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setSortDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights('addsort')"
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
      //分类数组
      sortlist: [],
      // 控制对话框的显示与隐藏
      setSortDialogVisible: false,
      dialog_title: '添加分类',
      //添加数据
      addsort: {
        name: '',
        alias: '',
        description: '',
        sort_url: '',
        _id: ''
      },
      //校验规则
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getSorts()
  },
  methods: {
    //查询分类
    getSorts: async function() {
      const { status, data } = await this.$axios.get('/sorts/getsort')
      if (status === 200) {
        if (data && data.code === 0) {
          this.$message({
            message: data.msg,
            type: 'success'
          })
          this.sortlist = data.data
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
    //添加或更改分类
    allotRights: async function(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let apikey = ''
          if (this.dialog_title === '添加分类') {
            apikey = 'addsort'
          } else {
            apikey = 'updatesort'
          }
          const { status, data } = await this.$axios.post(
            `/sorts/${apikey}`,
            this.addsort
          )
          console.log(data)
          if (status === 200) {
            if (data && data.code === 0) {
              this.$message({
                message: data.msg,
                type: 'success'
              })
              this.getSorts()
              this.setSortDialogClosed()
              this.setSortDialogVisible = false
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
    setSortDialogClosed: function() {
      this.addsort.name = ''
      this.addsort.alias = ''
      this.addsort.description = ''
      this.addsort.sort_url = ''
      this.addsort._id = ''
    },
    //修改分类
    handleEdit: function(index, row) {
      console.log(index, row)
      this.dialog_title = '修改分类'
      this.addsort.name = row.name
      this.addsort.alias = row.alias
      this.addsort.description = row.description
      this.addsort.sort_url = row.sort_url
      this.addsort._id = row._id
      this.setSortDialogVisible = true
    },
    //删除分类
    handleDelete: async function(index, row) {
      console.log(index, row)
      // 弹框提示用户是否要删除
      const confirmResult = await this.$confirm(
        '此操作将永久删除该分类, 是否继续?',
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

      const { status, data } = await this.$axios.post('/sorts/deletesort', {
        _id: row._id
      })
      if (status === 200) {
        if (data && data.code === 0) {
          this.$message({
            message: data.msg,
            type: 'success'
          })
          this.getSorts()
          this.setSortDialogClosed()
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
