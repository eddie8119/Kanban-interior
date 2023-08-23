<template>
  <div class="reset-password">
    <Modal v-if="modalActive" :modalMessage="modalMessage" @close-modal="closeModal" />
    <Loading v-if="loading" />
    <div class="form-wrap">
      <form class="reset">
        <p class="login-register">
          Back to
          <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
        </p>
        <h2>Reset Password</h2>
        <p>Forgot your passowrd? Enter your email to reset it</p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email" />
            <emailIcon class="icon" />
          </div>
        </div>
        <button @click.prevent="resetPassword">Reset</button>
        <div class="angle"></div>
      </form>
      <div class="background"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useStore } from 'vuex'
import {
  sendPasswordResetEmail,
} from '../firebase/firebase.js'
// import "firebase/auth"
import emailIcon from "../components/icons/emailIcon.vue"
import Modal from "../components/base/Modal.vue"
import Loading from "../components/base/Loading.vue"

const store = useStore()
const email = ref('')
const modalActive = ref(false)
const modalMessage = ref('')
const loading = ref(false)

const resetPassword = () => {
  if (email.value !== '') {
    loading.value = true
    firebase.auth().sendPasswordResetEmail(email.value)
      .then(() => {
        modalMessage.value = "If your account exists, you will receive a email"
        loading.value = false
        modalActive.value = true
      })
      .catch((err) => {
        modalMessage.value = err.message
        loading.value = false
        modalActive.value = true
      })
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