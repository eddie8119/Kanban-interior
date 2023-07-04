import axios from 'axios'

const state = {
  vuello: null
}

const getters = {
  getVuelloDatas(state) {
    return state.vuello
  }
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

const vuelloModule = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default vuelloModule