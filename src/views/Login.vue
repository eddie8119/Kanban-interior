<template>
  <div class="form-wrap">
    <form class="login">
      <router-link class="flex mb-[32px]" :to="{ name: 'Register' }">
        <p>還沒有帳號? <span class="text-funsugarMain">註冊</span> </p>
      </router-link>
      <h2>登入 室內工程手帳</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="Email" v-model="formData.email" />
          <emailIcon class="icon" />
        </div>
        <div class="input">
          <input type="password" placeholder="Password" v-model="formData.password" />
          <passwordIcon class="icon" />
        </div>
        <div v-show="error" class="error">{{ errorMsg }}</div>
      </div>
      <router-link class="forgot-password" :to="{ name: 'ForgotPassword' }">忘記你的密碼?</router-link>
      <button class="btn-style" @click.prevent="login">登入</button>
      <div class="angle"></div>
    </form>
    <div class="background-identity"></div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import emailIcon from "../components/icons/emailIcon.vue"
import passwordIcon from "../components/icons/passwordIcon.vue"

const store = useStore()
const router = useRouter()
const formData = reactive({
  email: 'demo@gmail.com',
  password: '123123'
})
const error = ref(null)
const errorMsg = ref('')
const user = computed(() => store.getters['user/getUser'])
const checkLogin = computed(() => store.getters['user/getCheckLogin'])


const login = async () => {
  await store.dispatch('user/loginUser', formData)
  .then(() => {
    if (checkLogin) router.replace("/")
  })  
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