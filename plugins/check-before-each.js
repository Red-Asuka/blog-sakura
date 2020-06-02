export default function({ store, app }) {
  app.router.beforeEach((to, from, next) => {
    if (to.path.indexOf('admin') !== -1) {
      if (!store.state.user.user) {
        return next('/login')
      }
    }
    // 其他页面模块，放行
    next()
  })
}
