const state = {
  vuello: null
}

const mutations = {
  SET_VUELLO(state, data) {
    state.vuello = data
  }
}

const actions = {
  setVuello({ commit }, data) {
    commit('SET_VUELLO', data)
  }
}

const getters = {
  getVuelloDatas(state) {
    return state.vuello
  }
}

export const vuello = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
