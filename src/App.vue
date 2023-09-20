<template>
  <div id="app" @click="clearMenu">
    <Navigation />
    <div class="pt-[70px] h-[100vh]">
      <router-view />
    </div>
    <!-- <Copyright /> -->
    <!-- <transition name="fade" mode="out-in">
      <ActionResponse :dialogData="getAlertDialog.dialogData" @closeAlert="closeAlertDialog"></ActionResponse>
    </transition> -->
  </div>
</template>

<script>
import Navigation from "./components/base/Navigation.vue"
import Copyright from "./components/base/Copyright.vue"
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'

//dialog
import ActionResponse from "@/components/dialog/ActionRespon.vue"
// import Modal from "@/components/dialog/Modal.vue"

export default {
  components: { Navigation, Copyright, ActionResponse },
  methods: {
    ...mapActions(['handleAuthStateChanged'])
  },
  computed: {
    ...mapGetters(["getAlertDialog"])
  },
  created() {
    this.$store.commit("app/SET_DIALOG", false)
    this.$store.commit("app/SET_LOADING", false)
    this.detectWindowWidth()
    this.detectWindowHeight()
    this.detectWindowScrollY()   
  },
  mounted() {  
    this.$store.dispatch('user/handleAuthStateChanged')
    this.$store.commit("menu/CLEAR_ALL_MENU")
    window.addEventListener("resize", this.detectWindowWidth)
    window.addEventListener("resize", this.detectWindowHeight)
    window.addEventListener("scroll", this.detectWindowScrollY)
  },
  methods: {
    detectWindowWidth() {
      this.$store.commit("app/SET_WINDOW_WIDTH", window.innerWidth);
    },
    detectWindowHeight() {
      this.$store.commit("app/SET_WINDOW_HEIGHT", window.innerHeight)
    },
    detectWindowScrollY() {
      this.$store.commit("app/SET_WINDOW_SCROLLY", window.scrollY)
    },
    clearMenu() {
      this.$store.commit("menu/CLEAR_ALL_MENU")
    },
    closeAlertDialog() {
      this.$store.commit("app/SET_ALERT_DIALOG", false)
    },
    closeModal() {
      this.$store.commit("app/SET_ALERT_DIALOG", false)
    },
    checkRoute(){      
      if (this.$route.path === "/") true
      else false
    }
  }
}
</script>

