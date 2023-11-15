export const menu = {
  namespaced: true,
  state() {
    return {
      profileMenu: true,
    }
  },
  mutations: {
    SET_PROFILE_MENU(state) {
      state.profileMenu = !state.profileMenu
    },
    CLEAR_ALL_MENU(state) {
      state.profileMenu = false
    },
  },
  actions: {},
  getters: {
    getProfileMenu(state) {
      return state.profileMenu
    },
  },
}
