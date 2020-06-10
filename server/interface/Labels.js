import Router from 'koa-router'
import labels from '../dbs/models/labels'
import axios from './utils/axios'

//声明路由
let router = new Router({ prefix: '/labels' })
//添加标签
router.post('/addlabel', async ctx => {
  const { name, alias, description, tag_url } = ctx.request.body
  // console.log(ctx.request.body)
  let f_name = await labels.find({ name })
  if (f_name.length) {
    ctx.body = {
      code: -1,
      msg: '标签已经添加过了哦'
    }
    return
  }
  let nlabels = await labels.create({
    name,
    alias,
    description,
    tag_url
  })
  if (nlabels) {
    ctx.body = {
      code: 0,
      msg: '添加成功',
      data: nlabels
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '添加失败'
    }
  }
})
//查询标签
router.get('/getlabel', async ctx => {
  let res = await labels.find()
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
//删除标签
router.post('/deletelabels', async ctx => {
  let res = await labels.remove({ _id: ctx.request.body._id })

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
//修改标签
router.post('/updatelabels', async ctx => {
  const { name, alias, description, tag_url, _id } = ctx.request.body
  console.log(ctx.request.body)
  let f_name = await labels.find({ name })
  if (f_name.length && f_name[0]._id != _id) {
    ctx.body = {
      code: -1,
      msg: '该标签已经添加过了哦'
    }
    return
  }
  let nlabels = await labels.updateOne(
    { _id },
    { name, alias, description, tag_url }
  )
  console.log(nlabels)

  if (nlabels) {
    ctx.body = {
      code: 0,
      msg: '修改成功',
      data: nlabels
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '修改失败'
    }
  }
})
export default router
