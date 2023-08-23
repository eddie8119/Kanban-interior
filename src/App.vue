<template>
  <div id="app">
    <Navigation  />
    <router-view />
  </div>
</template>

<script>
import Navigation from "./components/base/Navigation.vue"
import {defineComponent} from 'vue'
import {mapActions} from 'vuex'

export default {
  components: { Navigation },
  methods: {
    ...mapActions('userStore', ['handleAuthStateChanged'])
  },
  mounted() {
    this.handleAuthStateChanged()
  },
}
</script>

