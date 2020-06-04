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
  border-bottom: 0.1px solid;
}
.el-aside {
  height: 100%;
  position: fixed;
}
.el-main {
  margin: 20px 20px 20px 220px;
}
</style>
