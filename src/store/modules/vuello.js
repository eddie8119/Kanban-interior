export const vuello = {
  namespaced: true,
  state() {
    return {
      vuello: null
    }
  },
  mutations: {
    SET_VUELLO(state, data) {
      state.vuello = data
    }
  },
  actions: {
    setVuello({ commit }, data) {
      commit('SET_VUELLO', data)
    }
  },
  getters: {
    getVuelloDatas(state) {
      return state.vuello
    }
  }
}
