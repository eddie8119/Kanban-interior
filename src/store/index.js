import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import {vuello} from './modules/vuello'
import {user} from './modules/user'
import {app} from './modules/app'
import {menu} from './modules/menu'

export const store = createStore({
  modules: {
    vuello,
    user,
    menu,
    app
  },
  plugins: [createPersistedState()],  
})

