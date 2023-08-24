const state = {
  dialog: false,
  loading: false,
  windowWidth: 0,
  windowHeight: 0,
  windowScrollY: 0,
}

const mutations = {
  SET_DIALOG(state, payload) {
    state.dialog = payload;
  },
  SET_LOADING(state, payload) {
    state.loading = payload;
  },
  SET_WINDOW_WIDTH(state, payload) {
    state.windowWidth = payload;
  },
  SET_WINDOW_HEIGHT(state, payload) {
    state.windowHeight = payload;
  },
  SET_WINDOW_SCROLLY(state, payload) {
    state.windowScrollY = payload;
  },
}

const actions = {

}

const getters = {
  getDialog(state) {
    return state.dialog
  },
  getloading(state) {
    return state.loading
  },
  getWindowWidth(state) {
    return state.windowWidth
  },
  getWindowHeight(state) {
    return state.windowHeight
  },
  getWindowScrollY(state) {
    return state.windowScrollY
  },  
}

export const app = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}