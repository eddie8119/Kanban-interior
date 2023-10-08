import { createRouter, createWebHashHistory } from 'vue-router'
import homePage from '../views/home-page.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import Profile from '../views/Profile.vue'
// import { getAuth } from 'firebase/auth'
import { fbAuth } from '../firebase/firebase'
// import { getUidToken } from '../apis/auth'
// import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: homePage,
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
  // console.log('fbAuth.currentUser', fbAuth.currentUser.uid)
  // const checkLoginValue = router.app.$store.getters['user/getCheckLogin']
  // const checkLoginValue = router.app
  // console.log(checkLoginValue)
  if (to.name === 'login' && fbAuth.currentUser.uid) {
    return { name: 'home' }
  }
})

export default router
