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
  },
  getters: {
    getProfileMenu(state) {
      return state.profileMenu
    },
  }
}