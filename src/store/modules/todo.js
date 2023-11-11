export const todo = {
  namespaced: true,
  state() {
    return {
      todo: [],
    }
  },
  mutations: {
    SET_TODO(state, data) {
      state.todo = data
      localStorage.setItem('myTodo', JSON.stringify(data))
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
  },
}
