const state = () => ({ user: '' })

const mutations = {
  setUser(state, val) {
    state.user = val
  }
}

const actions = {
  setUser: ({ commit }, user) => {
    commit('setUser', user)
  }
}

export default { namespaced: true, state, mutations, actions }
