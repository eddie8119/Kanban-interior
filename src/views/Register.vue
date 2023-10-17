<template>
  <Loading v-if="loading" />
  <div class="form-wrap ">
    <form class="register">
      <router-link class="flex mb-[32px]" :to="{ name: 'Login' }">
        <p>已經有帳號了? <span class="text-funsugarMain">登入</span> </p>
      </router-link>
      <h2>創立帳號</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="Username" v-model="formData.username" />
          <userIcon class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Email" v-model="formData.email" />
          <emailIcon class="icon" />
        </div>
        <div class="input">
          <input type="password" placeholder="Password" v-model="formData.password" />
          <passwordIcon class="icon" />
        </div>
        <div v-show="error" class="error">{{ this.errorMsg }}</div>
      </div>
      <button class="btn-style" @click.prevent="register">註冊</button>
      <div class="angle"></div>
    </form>
    <div class="background-identity"></div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from "vue-router"
import emailIcon from "../components/icons/emailIcon.vue"
import passwordIcon from "../components/icons/passwordIcon.vue"
import userIcon from "../components/icons/userIcon.vue"
import Loading from "../components/base/Loading.vue"

const store = useStore()
const router = useRouter()
const formData = reactive({
  username: '',
  email: '',
  password: ''
})
const error = ref(null)
const errorMsg = ref('')
const checkAuthentication = computed(() => store.getters['user/getCheckAuthentication'])
const loading = ref(false)

const register = async() => {
  if (
    formData.email !== '' &&
    formData.password !== '' &&
    formData.username !== ''
  ) {
    loading.value = true
    error.value = false
    errorMsg.value = ''    
    const data = store.getters['vuello/getVuelloDatas']

    await store.dispatch('user/registerUser', {formData, data})
    .then(() => {      
      if (checkAuthentication) {
        formData.email = ''
        formData.password = ''
        formData.username = ''
        loading.value = false
        router.replace("/")
      } 
    }) 
    .catch(error => console.log(error))      
  } else {
    error.value = true
    errorMsg.value = '請填完所有表格'
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
