<template>
  <div class="searchbar">
    <el-row :gutter="5">
      <el-col :span="18">
        <el-input placeholder="搜索" prefix-icon="el-icon-search" size="medium">
        </el-input>
      </el-col>
      <el-col :span="6">
        <div class="avatar">
          <!-- <font-awesome-icon :icon="icon" /> -->
          <nuxt-link v-if="$store.state.user.user" to="/admin"
            ><el-avatar
              src="https://gravatar.catbk.cn/avatar/56f43d1f6f9e5b6d3a2b893385007161?s=96&d=https%3A%2F%2Fgravatar.ufile.ucloud.com.cn%2FTransparent_Akkarin-e1582610381361.png&r=g"
            ></el-avatar
          ></nuxt-link>
          <nuxt-link v-else to="/login"
            ><h1>登录</h1>
            ></nuxt-link
          >
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mu: 'music',
      icon: ['fas', 'music']
    }
  }
}
</script>

<style>
.el-menu {
  background-color: transparent;
}
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
</style>
