<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1">首页</el-menu-item>
    <el-submenu index="2">
      <template slot="title">归档</template>
      <el-menu-item index="2-1">笔记</el-menu-item>
      <el-menu-item index="2-2">软件</el-menu-item>
      <el-menu-item index="2-3">文章</el-menu-item>
      <el-menu-item index="2-4">日常</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">清单</template>
      <el-menu-item index="3-1">歌单</el-menu-item>
      <el-menu-item index="3-2">追剧</el-menu-item>
      <el-menu-item index="3-3">番组</el-menu-item>
    </el-submenu>
    <el-menu-item index="4">微语</el-menu-item>
    <el-menu-item index="5">留言板</el-menu-item>
    <el-menu-item index="6">后院</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style></style>
