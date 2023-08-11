import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
import router from '@/router/index.js'
import vuelloStore from './store/index.js'
import JsonExcel from "vue-json-excel3"


const app = createApp(App)
app.use(router)
app.use(vuelloStore)
app.component("downloadExcel", JsonExcel)
app.mount('#app')
