export const menu = {
  namespaced: true,
  state() {
    return {
      profileMenu: false,
    }
  },
  mutations: {
    SET_PROFILE_MENU(state, payload) {
      state.profileMenu = payload
    },
    CLEAR_ALL_MENU(state) {
      state.profileMenu = false
    }
  },
  actions: {
    // setProfileMenu({ commit }) {
    //   commit('SET_PROFILE_MENU')
    // }
  },
  getters: {
    getProfileMenu(state) {
      return state.profileMenu
    },
  }
}