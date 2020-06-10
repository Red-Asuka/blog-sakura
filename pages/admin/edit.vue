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
        <el-col>
          <nuxt-link to="/admin/post_new">
            <el-button type="primary" @click="setLinkDialogVisible = true"
              >写文章</el-button
            >
          </nuxt-link>
        </el-col>
      </el-row>
      <!-- 文章列表区域 -->
      <el-table :data="postlist" border stripe>
        <!-- 索引列 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="post_title" label="标题" width="180">
        </el-table-column>
        <el-table-column prop="sort_id" label="分类目录" width="80">
        </el-table-column>
        <el-table-column prop="post_date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="post_bg" label="缩列图" width="180">
        </el-table-column>
        <el-table-column prop="post_views" label="浏览" width="50">
        </el-table-column>
        <el-table-column prop="post_tags" label="标签"> </el-table-column>
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
    </el-card>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      //文章列表
      postlist: []
    }
  },
  created() {
    //获取文章列表
    this.getPostList()
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
          this.postlist = data.data
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
    }
  }
}
</script>

<style></style>
