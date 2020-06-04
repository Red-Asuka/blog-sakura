<template>
  <div class="admin-hearder">
    <div class="sitehome">
      <!-- <a
        href="/"
        style="background-image: url(https://mediacat.ufile.ucloud.com.cn/wp-content/uploads/2020/02/favorite.png); "
        >十年後の八月</a
      > -->
      <nuxt-link
        style="background-image: url(https://mediacat.ufile.ucloud.com.cn/wp-content/uploads/2020/02/favorite.png); "
        to="/"
      >
        <h1>登录</h1>
      </nuxt-link>
    </div>
    <div class="userinfo">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar
            src="https://gravatar.ufile.ucloud.com.cn/Asuka.jpg"
          ></el-avatar>
          <span>Asuka</span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.sitehome a {
  font-family: 'Microsoft Yahei';
  font-weight: bold;
  text-indent: 0px;
  font-size: 0px;
  height: 50px;
  width: 180px;
  float: left;
  line-height: 88px;
  line-height: 180%;
  text-align: center;
  color: #fff;
  margin-bottom: 5px;
  margin-top: 5px;
  background-position: center bottom !important;
  background-size: contain;
  box-shadow: none;
}
.el-dropdown {
  float: right;
  margin-right: 80px;
  margin-top: 10px;
}
.el-dropdown-link {
  float: right;
  height: 40px;
}
.el-dropdown-link span {
  float: left;
  font-size: 16px;
  text-align: center;
  display: block;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 5px;
}
</style>
