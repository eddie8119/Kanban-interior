<template>
  <div class="form-wrap">
    <form class="register">
      <p class="login-register">
        已經有帳號了?
        <router-link class="router-link" :to="{ name: 'Login' }">登入</router-link>
      </p>
      <h2>創立你的帳號</h2>
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
      <button @click.prevent="register">註冊</button>
      <div class="angle"></div>
    </form>
    <div class="background-identity"></div>
    <!-- Confirmation Modal -->
    <!-- <ConfirmationModal :value="true" @confirm="deleteDialog('card')" @close="state.isRemovingCard = false">
    註冊成功
  </ConfirmationModal> -->
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from "vue-router"
import emailIcon from "../components/icons/emailIcon.vue"
import passwordIcon from "../components/icons/passwordIcon.vue"
import userIcon from "../components/icons/userIcon.vue"
import ConfirmationModal from '@/components/dialog/ConfirmationModal.vue'

const store = useStore()
const router = useRouter()
const formData = reactive({
  username: 'demo',
  email: 'demo@gmail.com',
  password: '123123'
})

const error = ref(null)
const errorMsg = ref('')


const register = () => {
  if (
    formData.email !== '' &&
    formData.password !== '' &&
    formData.username !== ''
  ) {
    error.value = false
    errorMsg.value = ''    
    const data = store.getters['vuello/getVuelloDatas']   
    store.dispatch('user/registerUser', {formData, data})    
    router.replace("/")
  } else {
    error.value = true
    errorMsg.value = 'Please fill out all the fields!'
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
