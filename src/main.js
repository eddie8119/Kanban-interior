import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
import router from '@/router/index.js'
import vuelloStore from './store/index.js'

const app = createApp(App)
app.use(router)
app.use(vuelloStore)
app.mount('#app')
