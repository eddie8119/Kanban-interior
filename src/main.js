import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
import router from '@/router/index.js'
import vuelloStore from './store/index.js'
import vClickOutside from "click-outside-vue3"

const app = createApp(App)
app.use(router)
app.use(vuelloStore)
app.use(vClickOutside)
app.mount('#app')
