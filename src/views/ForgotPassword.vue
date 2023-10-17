<template>
  <div class="reset-password">
    <!-- <Modal :modalMessage="modalMessage" @close-modal="closeModal" /> -->
    <Loading v-if="loading" />
    <div class="form-wrap">
      <form class="reset">           
        <router-link class="flex mb-[32px]" :to="{ name: 'Login' }">返回<span class="text-funsugarMain">登入</span></router-link> 
        <h2>重新設密碼</h2>
        <p>忘記密碼了嗎？ 輸入您的電子郵件以重置它</p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email" />
            <emailIcon class="icon" />
          </div>
          <div v-show="error" class="error">{{ errorMsg }}</div>
        </div>
        <button class="btn-style" @click.prevent="resetPassword">重置</button>
        <div class="angle"></div>
      </form>
      <div class="background"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useStore } from 'vuex'
// import {  sendPasswordResetEmail } from '../firebase/firebase.js'
// import "firebase/auth"

// import { initializeApp } from 'firebase/app'
// import {
//   sendPasswordResetEmail,
// } from 'firebase/auth'
import emailIcon from "../components/icons/emailIcon.vue"
import Modal from "../components/dialog/Modal.vue"
import Loading from "../components/base/Loading.vue"

const email = ref('')
const error = ref(null)
const errorMsg = ref('')
const modalActive = ref(false)
const modalMessage = ref('')
const loading = ref(false)

const resetPassword = async() => {
  if (email.value !== '') {
    loading.value = true
    error.value = false
    errorMsg.value = ''
    await firebase.auth().sendPasswordResetEmail(email.value)
      .then(() => {
        modalMessage.value = "如果帳號存在,你將接收到 email "
        loading.value = false
        modalActive.value = true
      })
      .catch((err) => {
        modalMessage.value = err.message
        loading.value = false
        modalActive.value = true
      })
  } else {
    error.value = true
    errorMsg.value = '請填完表格'
  }
}
const closeModal = () => {
  modalActive.value = !modalActive.value
  email.value = ""
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/identityForm.scss";

.reset-password {
  position: relative;

  .form-wrap {
    .reset {
      h2 {
        margin-bottom: 8px;
      }

      p {
        text-align: center;
        margin-bottom: 32px;
      }
    }
  }
}
</style>