export default {
  dbs: 'mongodb://catbk:asdzx14@localhost:27017/myblog', //mongodb://catbk:catbk@127.0.0.1:27017/meituan
  redis: {
    get host() {
      return '127.0.0.1'
    },
    get port() {
      return 6379 //Redis默认端口，不建议修改
    }
  },
  // 配置邮箱服务
  smtp: {
    get host() {
      return 'smtp.126.com'
    },
    get user() {
      return 'catbkcn@126.com' //填入你的邮箱
    },
    get pass() {
      return 'w19ZkOW4z2p8' //填入你的授权码
    },
    get code() {
      //随机验证码
      return () => {
        return Math.random()
          .toString(16)
          .slice(2, 6)
          .toUpperCase()
      }
    },
    get expire() {
      // 过期时间
      return () => {
        return new Date().getTime() + 60 * 60 * 5000
      }
    }
  }
}
