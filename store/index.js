export const actions = {
  async nuxtServerInit({ commit }, { req, app }) {
    const {
      status,
      data: { user }
    } = await app.$axios.get('/users/getUser')
    commit('user/setUser', status === 200 ? user : '')
  }
}
