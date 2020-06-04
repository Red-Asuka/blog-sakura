// const Koa = require('koa')
import Koa from 'koa'
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

//加载一些重要包
import mongoose from 'mongoose'
import bodyParser from 'koa-bodyparser'
import session from 'koa-generic-session'
import Redis from 'koa-redis'
import json from 'koa-json'
import dbConfig from './dbs/config'
import passport from './interface/utils/passport'
import users from './interface/users'
import link_category from './interface/Link_category'

const app = new Koa()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

app.keys = ['mt', 'keyskeys']
app.proxy = true
app.use(session({ key: 'mt', prefix: 'mt:uid', store: new Redis() }))
app.use(
  bodyParser({
    extendTypes: ['json', 'form', 'text']
  })
)
app.use(json())

// 连接数据库
mongoose.connect(
  dbConfig.dbs,
  {
    useNewUrlParser: true
  },
  function(err) {
    if (err) {
      console.log('数据库连接失败')
      console.log(err)
    } else {
      console.log('数据库连接成功')
    }
  }
)

// passport相关配置
app.use(passport.initialize())
app.use(passport.session())

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  await nuxt.ready()
  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  //导入和配置接口路由（mark）
  app.use(users.routes()).use(users.allowedMethods())
  app.use(link_category.routes()).use(link_category.allowedMethods())
  app.use(ctx => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  // app.listen(port, host);
  // consola.ready({
  //   message: `Server listening on http://${host}:${port}`,
  //   badge: true
  // });
  app.listen(3001, host)
  consola.ready({
    message: `Server listening on http://${host}:3001`,
    badge: true
  })
}

start()
