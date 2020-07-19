import Router from 'koa-router'
import axios from './utils/axios'
import qiniu from 'qiniu'

//需要填写你的 Access Key 和 Secret Key
const accessKey = 'Access Key'
const secretKey = 'Secret Key'
//要上传的空间
const bucket = '要上传的空间'

// 文件前缀
const prefix = 'image/blog/'

//声明路由
let router = new Router({ prefix: '/qiniu' })

//登录接口
router.post('/upload', async (ctx, next) => {
  //上传到七牛后保存的文件名
  let key = ctx.request.body.key
  //生成上传 Token
  //   console.log(key, bucket)
  let mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
  let putPolicy = new qiniu.rs.PutPolicy({ scope: bucket })
  // 生成上传文件的 token
  let uptoken = putPolicy.uploadToken(mac)
  if (uptoken) {
    ctx.body = {
      code: 0,
      msg: '获取上传token成功',
      uptoken
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '获取token失败'
    }
  }
})

export default router
