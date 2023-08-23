import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import vuello from './modules/vuello'
import user from './modules/user'
import app from './modules/app'

const vuelloStore = createStore({
  modules: {
    vuello,
    user,
    app
  },
  plugins: [createPersistedState()],
})

export default vuelloStore