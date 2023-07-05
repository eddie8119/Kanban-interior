import { createRouter, createWebHashHistory } from 'vue-router'
import homePage from '../views/home-page.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: homePage
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
