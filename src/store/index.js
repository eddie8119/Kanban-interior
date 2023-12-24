import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import { vuello } from './modules/vuello'
import { user } from './modules/user'
import { app } from './modules/app'
import { menu } from './modules/menu'
import { todo } from './modules/todo'
import { material } from './modules/material'

export const store = createStore({
  modules: {
    vuello,
    user,
    menu,
    app,
    todo,
    material,
  },
  plugins: [createPersistedState()],
})
