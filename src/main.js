import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
import router from '@/router/index.js'
import { store } from './store/index.js'
import JsonExcel from 'vue-json-excel3'
import { SchedulePlugin } from '@syncfusion/ej2-vue-schedule'

const app = createApp(App)

app.use(router)
app.use(store)
app.component('downloadExcel', JsonExcel)
app.use(SchedulePlugin)
app.mount('#app')
