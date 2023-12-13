<template>
  <Loading v-show="loading" />
  <div class="form-wrap">
    <form class="register">
      <router-link class="flex mb-[32px]" :to="{ name: 'Login' }">
        <p>已經有帳號了? <span class="text-funsugarMain">登入</span> </p>
      </router-link>
      <h2>創立帳號</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="帳號" v-model="formData.username" />
          <userIcon class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Email" v-model="formData.email" />
          <emailIcon class="icon" />
        </div>
        <div class="input">
          <input type="password" placeholder="密碼(至少6位數)" v-model="formData.password" />
          <passwordIcon class="icon" />
        </div>
        <div class="input">
          <input type="password" placeholder="密碼再確認" v-model="formData.checkPassword" />
          <passwordIcon class="icon" />
        </div>
        <div v-show="error" class="error">{{ errorMsg }}</div>
      </div>
      <div class="flex flex-col">
        <button class="btn-style mb-2" @click.prevent="register">註冊</button>
        <!-- <button class="btn-style " @click.prevent="registerGoogle">Google註冊</button> -->
      </div>     
      <div class="angle"></div>
    </form>
    <div class="background-identity"></div>
  </div>
</template>

<script setup>
  import { ref, reactive, computed, watch } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import emailIcon from "../components/icons/EmailIcon.vue"
  import passwordIcon from "../components/icons/PasswordIcon.vue"
  import userIcon from "../components/icons/UserIcon.vue"
  import Loading from "../components/base/Loading.vue"
  const store = useStore()
  const router = useRouter()
  const formData = reactive({
    username: '',
    email: '',
    password: '',
    checkPassword: '',
  })
  const error = ref(null)
  const errorMsg = ref('')

  const checkAuthentication = computed(() => store.getters['user/getCheckAuthentication'])
  const loading = computed(() => store.getters['app/getLoading'])
  
  const register = async () => {
    if (
      formData.email !== '' &&
      formData.username !== '' &&
      formData.password !== '' &&
      formData.checkPassword !== ''
    ) {
      if (formData.password !== formData.checkPassword) alert('確認密碼與密碼不符')
      else {        
        store.commit("app/SET_LOADING", true)
        formData.email = formData.email.trim()
        formData.username = formData.username.trim()
        formData.password = formData.password.trim()
        formData.checkPassword = formData.checkPassword.trim()

        const data = store.getters['vuello/getVuelloDatas']

        await store.dispatch('user/registerUser', {
          formData,
          data
        })
        if (checkAuthentication.value) router.replace("/")
        store.commit("app/SET_LOADING", false)
      }
    } else {
      error.value = true
      errorMsg.value = '請填完所有表格'
    }
  }

  const registerGoogle = async () => {    
    await store.dispatch('user/registerGoogleUser')
    if (checkAuthentication.value) router.replace("/")   
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