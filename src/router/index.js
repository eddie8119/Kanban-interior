import { createRouter, createWebHashHistory } from 'vue-router'
import homePage from '../views/home-page.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ForgotPassword from "../views/ForgotPassword.vue"
import Profile from '../views/Profile.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: homePage
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register",
    },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: {
      title: "Forgot Password",      
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      title: "profile",      
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
