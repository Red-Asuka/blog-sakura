<template>
  <div class="site-header">
    <div
      class="scrollbar"
      id="bar"
      style="width: 82%; background: orange;"
    ></div>
    <el-row :gutter="20">
      <el-col :span="4">
        <site-loge />
      </el-col>
      <el-col :span="15">
        <nav-menu />
      </el-col>
      <el-col :span="5">
        <search-bar />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SiteLoge from '@/components/public/header/sitelogo.vue'
import NavMenu from '@/components/public/header/navmenu.vue'
import SearchBar from '@/components/public/header/searchbar.vue'

export default {
  components: {
    SiteLoge,
    NavMenu,
    SearchBar
  }
}
</script>

<style>
.site-header {
  width: 100%;
  height: 75px;
  background: 0 0;
  -webkit-transition: all 0.4s ease;
  transition: all 0.4s ease;
  position: fixed;
  z-index: 9999;
  top: 0;

  position: fixed;
  left: 0;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 1px 40px -8px rgba(0, 0, 0, 0.5);
}
.scrollbar {
  position: fixed;
  top: 0;
  height: 3px;
  background: orange;
  transition-duration: 1s, 1s;
  z-index: 99999;
}
.scrollbar,
.butterBar-message {
  background: #fe9600 !important;
}
</style>
