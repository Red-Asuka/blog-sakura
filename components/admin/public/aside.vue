<template>
  <div class="aside">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <nuxt-link to="/admin">
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">Home</span>
        </el-menu-item>
      </nuxt-link>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item index="2-1">所有文章</el-menu-item>
        <el-menu-item index="2-2">写文章</el-menu-item>
        <el-menu-item index="2-3">分类目录</el-menu-item>
        <el-menu-item index="2-4">标签</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>链接</span>
        </template>
        <nuxt-link to="/admin/link-manager">
          <el-menu-item index="3-1">
            所有链接
          </el-menu-item>
        </nuxt-link>
        <nuxt-link to="/admin/link-add">
          <el-menu-item index="3-2">
            添加链接
          </el-menu-item>
        </nuxt-link>
        <nuxt-link to="/admin/link_category">
          <el-menu-item index="3-3">
            链接分类目录
          </el-menu-item>
        </nuxt-link>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
