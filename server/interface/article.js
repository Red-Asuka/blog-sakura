import Router from 'koa-router'
import articles from '../dbs/models/articles'
import axios from './utils/axios'
import multer from 'koa-multer' //加载koa-multer模块

//声明路由
let router = new Router({ prefix: '/article' })

//添加文章
router.post('/addarticle', async ctx => {
  const {
    post_title,
    sort_id,
    post_bg,
    post_description,
    post_content,
    post_tags
  } = ctx.request.body
  // console.log(ctx.request.body)

  let narticle = await articles.create({
    post_title,
    sort_id,
    post_bg,
    post_description,
    post_content,
    post_tags
  })
  if (narticle) {
    ctx.body = {
      code: 0,
      msg: '添加成功',
      data: narticle
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '添加失败'
    }
  }
})
//文件上传
//配置
var storage = multer.diskStorage({
  //文件保存路径
  destination: function(req, file, cb) {
    cb(null, 'static/uploads/')
  },
  //修改文件名称
  filename: function(req, file, cb) {
    var fileFormat = file.originalname.split('.')
    cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
  }
})
//加载配置
var upload = multer({ storage: storage })
//图片上传
router.post('/upload', upload.single('file'), async (ctx, next) => {
  ctx.body = {
    filename: ctx.req.file.filename //返回文件名
  }
})

export default router
