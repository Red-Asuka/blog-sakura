import Router from 'koa-router'
import sorts from '../dbs/models/sort'
import axios from './utils/axios'

//声明路由
let router = new Router({ prefix: '/sorts' })
//添加分类
router.post('/addsort', async ctx => {
  const { name, alias, description, sort_url } = ctx.request.body
  // console.log(ctx.request.body)
  let f_name = await sorts.find({ name })
  if (f_name.length) {
    ctx.body = {
      code: -1,
      msg: '分类已经添加过了哦'
    }
    return
  }
  let nsorts = await sorts.create({
    name,
    alias,
    description,
    sort_url
  })
  if (nsorts) {
    ctx.body = {
      code: 0,
      msg: '添加成功',
      data: nsorts
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '添加失败'
    }
  }
})
//查询分类
router.get('/getsort', async ctx => {
  let res = await sorts.find()
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
//删除分类
router.post('/deletesort', async ctx => {
  let res = await sorts.remove({ _id: ctx.request.body._id })

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
//修改分类
router.post('/updatesort', async ctx => {
  const { name, alias, description, sort_url, _id } = ctx.request.body
  console.log(ctx.request.body)
  let f_name = await sorts.find({ name })
  if (f_name.length && f_name[0]._id != _id) {
    ctx.body = {
      code: -1,
      msg: '该分类已经添加过了哦'
    }
    return
  }
  let nsorts = await sorts.updateOne(
    { _id },
    { name, alias, description, sort_url }
  )
  console.log(nsorts)

  if (nsorts) {
    ctx.body = {
      code: 0,
      msg: '修改成功',
      data: nsorts
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '修改失败'
    }
  }
})
export default router
