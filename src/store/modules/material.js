export const material = {
  namespaced: true,
  state() {
    return {
      materialAmounts: [],
    }
  },
  mutations: {
    // SET_TODO(state, data) {
    //   state.todo = data
    //   localStorage.setItem('myTodo', JSON.stringify(data))
    // },
  },
  actions: {
    // setTodo({ commit }, data) {
    //   commit('SET_TODO', data)
    // },
  },
  getters: {
    getMaterialAmountsDatas(state) {
      return state.materialAmounts
    },
  },
}
