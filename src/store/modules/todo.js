export const todo = {
  namespaced: true,
  state() {
    return {
      todo: [],
      showTodoSlide: false,
    }
  },
  mutations: {
    SET_TODO(state, data) {
      state.todo = data
      localStorage.setItem('myTodo', JSON.stringify(data))
    },
    SET_SHOWTODOSLIDE(state) {
      state.showTodoSlide = !state.showTodoSlide
    },
    SET_CLEAR_SHOWTODOSLIDE(state) {
      state.showTodoSlide = false
    },
  },
  actions: {
    setTodo({ commit }, data) {
      commit('SET_TODO', data)
    },
  },
  getters: {
    getTodoDatas(state) {
      return state.todo
    },
    getShowTodoSlide(state) {
      return state.showTodoSlide
    },
  },
}
