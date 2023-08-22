<template>
  <div class="form-wrap">
    <form class="login">
      <p class="login-register">
        Don't have an account?
        <router-link class="router-link" :to="{ name: 'Register' }">Register</router-link>
      </p>
      <h2>Login to FireBlogs</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="Email" v-model="formData.email" />
        </div>
        <div class="input">
          <input type="password" placeholder="Password" v-model="formData.password" />
        </div>
        <div v-show="error" class="error">{{ errorMsg }}</div>
      </div>
      <router-link class="forgot-password" :to="{ name: 'ForgotPassword' }">Forgot your password?</router-link>
      <button @click.prevent="login">Login</button>
      <div class="angle"></div>
    </form>
    <div class="background-identity"></div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useStore } from 'vuex'
// import emailIcon from "../assets/Icons/envelope-regular.svg";
// import passwordIcon from "../assets/Icons/lock-alt-solid.svg";

const store = useStore()
const formData = reactive({  
  email: 'demo@gmail.com',
  password: '123123'
})
const error = ref(null)
const errorMsg = ref('')

const login = async () => {
  store.dispatch('user/loginUser', formData)
}

</script>

<style lang="scss" scoped>
@import "@/assets/scss/identityForm.scss";

.background-identity {
  display: none;
  flex: 2;
  background-size: cover;
  background-image: url("../assets/background.png");
  width: 100%;
  height: 100%;

  @media (min-width: 900px) {
    display: initial;
  }
}
</style>