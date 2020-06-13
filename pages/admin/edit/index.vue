<template>
  <div class="edit">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容管理</el-breadcrumb-item>
      <el-breadcrumb-item>所有文章</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 添加文章按钮区域 -->
      <el-row>
        <el-col :span="3">
          <nuxt-link to="/admin/post_new">
            <el-button type="primary">写文章</el-button>
          </nuxt-link>
        </el-col>
        <el-col :span="4" :offset="17">
          <el-input
            placeholder="Enter"
            suffix-icon="el-icon-search"
            v-model="searchcontent"
            clearable
            size="small"
            @change="inputchange"
          >
          </el-input>
        </el-col>
      </el-row>
      <!-- 文章列表区域 -->
      <el-table :data="showlist" border stripe v-if="flag">
        <!-- 索引列 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="缩列图" width="120">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.post_bg"
              fit="fill"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="post_title" label="标题" width="180">
        </el-table-column>
        <el-table-column prop="post_description" label="文章描述" width="180">
        </el-table-column>
        <el-table-column prop="sort_name" label="分类目录" width="80">
        </el-table-column>
        <el-table-column prop="post_date" label="日期" width="180">
        </el-table-column>

        <el-table-column prop="post_views" label="浏览" width="50">
        </el-table-column>
        <el-table-column label="标签">
          <template slot-scope="scope">
            <el-tag v-for="tag in scope.row.post_tags" :key="tag">
              {{ tag }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="181px">
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
      <!-- 分页控件 -->
      <el-pagination
        v-if="flag"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageinfo.pagenum"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageinfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="searchlist.length"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      //文章列表
      postlist: [],
      //分类数组
      sortlist: [],
      //搜索内容
      searchcontent: '',
      //搜索结果
      searchlist: [],
      flag: false,
      //分页信息
      pageinfo: {
        pagesize: 5,
        pagenum: 1
      },
      //显示列表
      showlist: []
    }
  },
  created() {
    //合并数组
    this.getSortbyId()
  },
  methods: {
    //获取文章列表
    getPostList: async function() {
      const { status, data } = await this.$axios.get('/article/getarticle')
      if (status === 200) {
        if (data && data.code === 0) {
          this.$message({
            message: data.msg,
            type: 'success'
          })
          //格式化时间
          this.postlist = this.formatTime(data.data)
          console.log(this.postlist)
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
    //合并数组
    getSortbyId: async function() {
      //获取文章列表
      await this.getPostList()
      //获取分类列表
      await this.getSorts()
      //合并数组
      for (let i = 0; i < this.postlist.length; i++) {
        for (let j = 0; j < this.sortlist.length; j++) {
          if (this.postlist[i].sort_id == this.sortlist[j]._id) {
            this.postlist[i].sort_name = this.sortlist[j].name
          }
        }
      }
      //赋值绑定的文章数组
      this.searchlist = this.postlist
      //显示当前页文章
      this.showlist = this.showlistchange()
      this.flag = true
    },
    //格式化时间
    formatTime: function(data) {
      for (let j = 0; j < data.length; j++) {
        data[j].post_date = this.utils.formatDate(data[j].post_date)
      }
      return data
    },
    //修改文章
    handleEdit: function(index, row) {
      console.log(index, row)
      let id = row._id
      this.$router.push({ path: '/admin/edit/' + id })
    },
    //删除文章
    handleDelete: async function(index, row) {
      console.log(index, row)
      // 弹框提示用户是否要删除
      const confirmResult = await this.$confirm(
        '此操作将永久删除该文章, 是否继续?',
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

      const { status, data } = await this.$axios.post(
        '/article/deletearticle',
        {
          _id: row._id
        }
      )
      if (status === 200) {
        if (data && data.code === 0) {
          this.$message({
            message: data.msg,
            type: 'success'
          })
          this.getSortbyId()
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
    //每页数量
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.pageinfo.pagesize = val
      this.showlist = this.showlistchange()
      console.log(this.showlist)
    },
    //当前页
    handleCurrentChange(val) {
      this.pageinfo.pagenum = val
      this.showlist = this.showlistchange()
      console.log(this.showlist)
      // console.log(`当前页: ${val}`)
    },
    // 分页数据处理
    showlistchange() {
      return this.searchlist.slice(
        this.pageinfo.pagesize * (this.pageinfo.pagenum - 1),
        this.pageinfo.pagesize * (this.pageinfo.pagenum - 1) +
          this.pageinfo.pagesize
      )
    },
    //搜索处理
    inputchange: function() {
      console.log(this.searchcontent)
      let arr = []
      if (this.searchcontent == '') {
        this.searchlist = this.postlist
      } else {
        for (let i = 0; i < this.postlist.length; i++) {
          if (
            this.postlist[i].post_title.indexOf(this.searchcontent) != -1 ||
            this.postlist[i].sort_name.indexOf(this.searchcontent) != -1 ||
            this.postlist[i].post_description.indexOf(this.searchcontent) != -1
          ) {
            arr.push(this.postlist[i])
          }
        }
        this.searchlist = arr
      }

      console.log(this.searchlist)
      //改变当前页显示内容
      this.showlist = this.searchlist.slice(
        this.pageinfo.pagesize * (this.pageinfo.pagenum - 1),
        this.pageinfo.pagesize * (this.pageinfo.pagenum - 1) +
          this.pageinfo.pagesize
      )
    }
  }
}
</script>

<style>
.el-tag {
  margin-right: 5px;
}
</style>
