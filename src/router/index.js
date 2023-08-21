import { createRouter, createWebHashHistory } from 'vue-router'
import homePage from '../views/home-page.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ForgotPassword from "../views/ForgotPassword.vue";

const routes = [
  {
    path: '/',
    name: 'home',
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
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
