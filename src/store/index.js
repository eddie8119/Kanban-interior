import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import vuello from './modules/vuello'
import user from './modules/user'

const vuelloStore = createStore({
  modules: {
    vuello,
    user
  },
  plugins: [createPersistedState()],
})

export default vuelloStore