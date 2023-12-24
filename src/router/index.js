import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '@/views/home-page.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import TodoList from '@/views/TodoList.vue'
import Material from '@/views/Material.vue'
import Scheduler from '@/views/Scheduler.vue'
import Profile from '@/views/Profile.vue'
import { fbAuth } from '@/firebase/firebase'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/scheduler',
    name: 'Scheduler',
    component: Scheduler,
  },
  {
    path: '/todoList',
    name: 'TodoList',
    component: TodoList,
  },
  {
    path: '/material',
    name: 'Material',
    component: Material,
  },

  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login',
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: 'Register',
    },
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: {
      title: 'Forgot Password',
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: 'profile',
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, next) => {
  if (to.name === 'login' && fbAuth.currentUser.uid) {
    return { name: 'home' }
  }
})

export default router
