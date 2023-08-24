<template>
  <div id="app">
    <Navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from "./components/base/Navigation.vue"
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'


export default {
  components: { Navigation },
  methods: {
    ...mapActions(['handleAuthStateChanged'])
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
    }
  }
}
</script>

