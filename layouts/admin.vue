<template>
  <el-container>
    <el-header>
      <my-header />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <my-aside />
      </el-aside>
      <el-main>
        <nuxt />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import myAside from '@/components/admin/public/aside.vue'
import myHeader from '@/components/admin/public/header.vue'
export default {
  components: {
    myAside,
    myHeader
  }
}
</script>

<style scoped>
.el-header {
  border-bottom: solid 1px #e6e6e6;
  z-index: 2000;
  top: 0;
  position: fixed;
  left: 0;
  width: 100%;
  background: #fff;
}
.el-aside {
  height: 100%;
  position: fixed;
  left: 0;
  top: 60px;
  border-right: solid 1px #e6e6e6;
}
.el-main {
  margin: 80px 20px 20px 220px;
}
</style>
