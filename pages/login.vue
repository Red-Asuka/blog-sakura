<template>
  <div class="login-wrap">
    <h4 v-if="error" class="tips"><i />{{ error }}</h4>
    <div class="login-html">
      <input id="tab-1" type="radio" name="tab" class="sign-in" checked /><label
        for="tab-1"
        class="tab"
        >登录</label
      >
      <input id="tab-2" type="radio" name="tab" class="sign-up" /><label
        for="tab-2"
        class="tab"
        >注册</label
      >
      <div class="login-form">
        <div class="sign-in-htm">
          <div class="group">
            <label for="user" class="label">用户名</label>
            <input v-model="username" id="user" type="text" class="input" />
          </div>
          <div class="group">
            <label for="pass" class="label">密码</label>
            <input
              v-model="password"
              id="pass"
              type="password"
              class="input"
              data-type="password"
            />
          </div>
          <div class="group">
            <input id="check" type="checkbox" class="check" checked />
            <label for="check"
              ><span class="icon"></span> Keep me Signed in</label
            >
          </div>
          <div class="group">
            <input type="submit" class="button" value="登录" @click="login" />
          </div>
          <div class="hr"></div>
          <div class="foot-lnk">
            <a href="#forgot">忘记密码?</a>
          </div>
        </div>
        <div class="sign-up-htm">
          <div class="group">
            <label for="user" class="label">用户名</label>
            <input id="user" type="text" class="input" />
          </div>
          <div class="group">
            <label for="pass" class="label">密码</label>
            <input
              id="pass"
              type="password"
              class="input"
              data-type="password"
            />
          </div>
          <div class="group">
            <label for="pass" class="label">确认密码</label>
            <input
              id="pass"
              type="password"
              class="input"
              data-type="password"
            />
          </div>
          <div class="group">
            <label for="pass" class="label">邮箱</label>
            <input id="pass" type="text" class="input" />
          </div>
          <div class="group">
            <input type="submit" class="button" value="注册" />
          </div>
          <div class="hr"></div>
          <div class="foot-lnk">
            <label for="tab-1">已经有账号了?</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'

export default {
  layout: 'blank',
  data() {
    return { checked: '', username: '', password: '', error: '' }
  },
  methods: {
    login: function() {
      let self = this
      console.log(this.username)

      self.$axios
        .post('/users/signin', {
          // username: window.encodeURIComponent(self.username),
          username: self.username,
          password: CryptoJS.MD5(self.password).toString()
        })
        .then(({ status, data }) => {
          if (status === 200) {
            if (data && data.code === 0) {
              location.href = '/admin'
            } else {
              self.error = data.msg
            }
          } else {
            self.error = `服务器出错`
          }
        })
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/login/index.css';
</style>
