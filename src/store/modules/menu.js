const state = {
  profileMenu: false,
}

const mutations = {
  SET_PROFILE_MENU(state) {
    state.profileMenu = !state.profileMenu
  },
  CLEAR_ALL_MENU(state) {
    state.profileMenu = false
  }
}

const actions = {
  setProfileMenu({ commit }) {
    commit('SET_PROFILE_MENU')
    
  }
}

const getters = {
  getProfileMenu(state) {
    return state.profileMenu
  },
}

export const menu = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}