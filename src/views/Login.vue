<template>
  <Loading v-show="loading" />
  <div class="form-wrap">
    <form class="login">
      <router-link class="flex mb-[32px]" :to="{ name: 'Register' }">
        <p>還沒有帳號? <span class="text-funsugarMain">註冊</span> </p>
      </router-link>
      <h2>登入 室內工程手帳</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="Email" v-model="formData.email" />
          <EmailIcon class="icon" />
        </div>
        <div class="input">
          <input type="password" placeholder="Password" v-model="formData.password" />
          <PasswordIcon class="icon" />
        </div>
        <div v-show="error" class="error">{{ errorMsg }}</div>
      </div>
      <router-link class="forgot-password" :to="{ name: 'ForgotPassword' }"><span class="text-funsugarMain">忘記</span> 你的密碼?</router-link>
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
  import EmailIcon from "../components/icons/EmailIcon.vue"
  import PasswordIcon from "../components/icons/PasswordIcon.vue"
  import Loading from "../components/base/Loading.vue"
  const store = useStore()
  const router = useRouter()
  const formData = reactive({
    email: '',
    password: ''
  })
  const error = ref(false)
  const errorMsg = ref('')
 
  const user = computed(() => store.getters['user/getUser'])
  const checkAuthentication = computed(() => store.getters['user/getCheckAuthentication'])
  const loading = computed(() => store.getters['app/getLoading'])
  
  const login = async () => {
    if (formData.email !== "" && formData.password !== "") {      
      store.commit("app/SET_LOADING", true)
      formData.email = formData.email.trim()
      formData.password = formData.password.trim()

      try {
        await store.dispatch("user/loginUser", formData)
        if (checkAuthentication.value) router.replace("/")
      } catch {
        error.value = true
        errorMsg.value = "登入失敗，請再次確認輸入"
      } finally {
        store.commit("app/SET_LOADING", false)
      }      
    } else {
      error.value = true
      errorMsg.value = "請填完所有表格"
    }
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