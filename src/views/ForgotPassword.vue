<template>
  <div class="reset-password">
    <!-- <Modal :modalMessage="modalMessage" @close-modal="closeModal" /> -->
    <Loading v-show="loading" />
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
import emailIcon from "../components/icons/EmailIcon.vue"
import Modal from "../components/dialog/Modal.vue"
import Loading from "../components/base/Loading.vue"

const store = useStore()
const email = ref('')
const error = ref(null)
const errorMsg = ref('')
const modalActive = ref(false)
const modalMessage = ref('')

const loading = computed(() => store.getters['app/getLoading'])

const resetPassword = async() => {
  if (email.value !== '') {    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      error.value = true
      errorMsg.value = '請輸入正確的Email格式'
      return
    }
    store.commit("app/SET_LOADING", true)           
    try {
      await store.dispatch("user/passwordReset", email.value.trim())   
    } catch {
      error.value = true
      errorMsg.value = "重置失敗，請再次確認輸入"
    } finally {
      store.commit("app/SET_LOADING", false)
    }
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