import Router from 'koa-router'
import link_category from '../dbs/models/link_category'
import link from '../dbs/models/link'
import axios from './utils/axios'

//声明路由
let router = new Router({ prefix: '/alink' })

//添加友链分类
router.post('/addlinkcategory', async ctx => {
  const { name, description, link_id } = ctx.request.body
  // console.log(ctx.request.body)
  let f_name = await link_category.find({ name })
  let f_link_id = await link_category.find({ link_id })
  if (f_name.length || f_link_id.length) {
    ctx.body = {
      code: -1,
      msg: '分类名称或id已存在'
    }
    return
  }
  let nlink = await link_category.create({ name, description, link_id })
  if (nlink) {
    ctx.body = {
      code: 0,
      msg: '添加成功',
      data: nlink
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '添加失败'
    }
  }
})
//查询友链分类
router.get('/getlinkcategory', async ctx => {
  let res = await link_category.find()
  if (res) {
    ctx.body = {
      code: 0,
      msg: '查询成功',
      data: res
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '查询失败'
    }
  }
})
//删除友链分类
router.post('/deletelinkcategory', async ctx => {
  let res = await link_category.remove({ link_id: ctx.request.body.link_id })
  if (res) {
    ctx.body = {
      code: 0,
      msg: '删除成功',
      data: res
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '删除失败'
    }
  }
})
//修改友链分类
router.post('/updatelinkcategory', async ctx => {
  const { name, description, link_id, _id } = ctx.request.body
  console.log(ctx.request.body)
  let f_name = await link_category.find({ name })
  let f_link_id = await link_category.find({ link_id })

  if (
    (f_name.length && f_name[0]._id != _id) ||
    (f_link_id.length && f_link_id[0]._id != _id)
  ) {
    ctx.body = {
      code: -1,
      msg: '分类名称或id已存在'
    }
    return
  }
  let nlink = await link_category.update(
    { _id },
    { name, description, link_id }
  )
  if (nlink) {
    ctx.body = {
      code: 0,
      msg: '修改成功',
      data: nlink
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '修改失败'
    }
  }
})
//添加友链
router.post('/addlink', async ctx => {
  const { name, description, siteurl, avatar, link_type } = ctx.request.body
  // console.log(ctx.request.body)
  let f_siteurl = await link.find({ siteurl })
  if (f_siteurl.length) {
    ctx.body = {
      code: -1,
      msg: '网站已经添加过了哦'
    }
    return
  }
  let nlink = await link.create({
    name,
    description,
    siteurl,
    avatar,
    link_type
  })
  if (nlink) {
    ctx.body = {
      code: 0,
      msg: '添加成功',
      data: nlink
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '添加失败'
    }
  }
})
//查询友链
router.get('/getlink', async ctx => {
  let res = await link.find()
  if (res) {
    ctx.body = {
      code: 0,
      msg: '查询成功',
      data: res
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '查询失败'
    }
  }
})
//删除友链
router.post('/deletelink', async ctx => {
  let res = await link.remove({ _id: ctx.request.body._id })

  if (res) {
    ctx.body = {
      code: 0,
      msg: '删除成功',
      data: res
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '删除失败'
    }
  }
})
//修改友链
router.post('/updatelink', async ctx => {
  const {
    name,
    description,
    siteurl,
    avatar,
    link_type,
    _id
  } = ctx.request.body
  console.log(ctx.request.body)
  let f_siteurl = await link.find({ siteurl })
  if (f_siteurl.length && f_siteurl[0]._id != _id) {
    ctx.body = {
      code: -1,
      msg: '该友链已经添加过了哦'
    }
    return
  }
  let nlink = await link.updateOne(
    { _id },
    { name, description, siteurl, avatar, link_type }
  )
  console.log(nlink)

  if (nlink) {
    ctx.body = {
      code: 0,
      msg: '修改成功',
      data: nlink
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '修改失败'
    }
  }
})
export default router
