<template>
  <header class="w-full bg-[#fff] px-[25px] fixed z-[10] box-shadow">
    <nav class=" flex items-center h-[70px]">
      <div class="flex items-center ">
        <img src="../../assets/img/brand/logo.png" class="w-[40px] mr-2" alt="">
        <router-link class="header font-semibold text-[16px] sm:text-[24px] text-black"
          :to="{ name: 'Home' }">DesignerHelper</router-link>
      </div>
      <div class="nav-links flex items-center justify-end">
        <ul v-show="device !== 'mobile'" class="flex items-center font-medium mr-[32px]">     
          <router-link class="link" :class="[path === '/' ? 'text-funsugarMain':'']" :to="{ name: 'Home' }">室內工地手帳</router-link>
          <router-link class="link" :class="[path === '/todoList' ? 'text-funsugarMain':'']" :to="{ name: 'TodoList' }">工地待辦速記</router-link>        
          <a class="link" role="link" href="https://funsugar-interior-photographer.netlify.app/"
            target="_blank">
            室內攝影服務
          </a> 
          <a class="link" role="link" href="https://tanxin.space/"
            target="_blank">
            室內網站服務
          </a>               
          <router-link v-if="!user" class="btn-style" :to="{ name: 'Login' }">登入/註冊</router-link>
        </ul>
        <div v-if="user" :class="[device === 'mobile' ? 'mr-[40px]' : '']" @click="toggleProfileMenu" class="               
        relative
        flex
        items-center
        justify-center
        w-[40px]
        h-[40px]
        text-[#fff]
        bg-funsugarMain-gradient      
        hover:bg-main
        duration-300
        rounded-full
        cursor-pointer        
        " ref="profile">
          <span class="pointer-events-none">{{ store.state.profileInitials }}</span>
          <div v-show="isProfileMenu" class="
          absolute
          top-[60px]
          right-0
          w-[250px]
          bg-main
          box-shadow    
          rounded-lg      
          profile-menu          
          ">
            <div class="info flex items-center p-[15px] border-b-[#fff]">
              <p class="initials
              w-[40px]
              h-[40px]
              bg-[#fff]
              text-main
              flex items-center justify-center
              rounded-full
              ">{{ store.state.profileInitials }}</p>
              <div class="right">
                <p>{{ user.name }}</p>
                <p>{{ user.email }}</p>
              </div>
            </div>
            <div class="options">
              <!-- <div class="option">
                <router-link class="option" :to="{ name: 'Profile' }">
                  <userIcon class="icon" />
                  <p>個人資料</p>
                </router-link>
              </div> -->
              <!-- <div v-if="admin" class="option">
                <router-link class="option" :to="{ name: '' }">                  
                  <p>Admin</p>
                </router-link>
              </div> -->
              <div @click.prevent="logoutUser" class="option">
                <signOutIcon class="icon" />
                <p>登出</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <menuIcon v-show="device === 'mobile'" class=" absolute   right-[25px] h-[25px] cursor-pointer"
        @click="toggleMobileNav" />
    </nav>
    <transition name="mobile-nav" class="box-shadow" @click="toggleMobileNav">
      <ul class="mobile-nav 
      top-0
      left-0
      w-[65%]
      h-full
      fixed
      flex flex-col     
      max-w-[250px]
      text-main
      bg-main-gray
      rounded-r-[20px]
      p-[20px] 
      z-[10] 
      " v-show="mobileNav">
        <router-link class="mobileNav-link" :class="[path === '/' ? 'text-funsugarMain':'']" :to="{ name: 'Home' }">室內工地手帳</router-link>
        <router-link class="mobileNav-link" :class="[path === '/todoList' ? 'text-funsugarMain':'']" :to="{ name: 'TodoList' }">工地待辦速記</router-link>
        <a class="mobileNav-link" role="link"
          href="https://funsugar-interior-photographer.netlify.app/" target="_blank">
          室內攝影服務
        </a>  
        <a class="mobileNav-link" role="link" href="https://tanxin.space/"
            target="_blank">
            室內網站服務
        </a>  
        <a class="mobileNav-link" role="link"
          href="https://mail.google.com/mail/?view=cm&fs=1&to=funsugar8119@gmail.com&body=詢問:" target="_blank">
          網站意見反饋
        </a> 
        <router-link v-if="!user" class="btn-style text-center" :to="{ name: 'Login' }" @click="toggleMobileNav">登入/註冊</router-link>
      </ul>
    </transition>
  </header>
</template>

<script setup>
import { ref, reactive, watch, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'
import { useRoute } from 'vue-router'
import userIcon from "../icons/UserIcon.vue"
import menuIcon from "../icons/MenuIcon.vue"
import signOutIcon from "../icons/SignOutIcon.vue"

const route=useRoute();
const path = computed(() =>route.path)

const store = useStore()
const mobileNav = ref(false)
const profile = ref(null)

const isProfileMenu = computed(() => store.getters['menu/getProfileMenu'])
const user = computed(() => store.getters['user/getUser'])
const windowWidth = computed(() => store.getters['app/getWindowWidth'])
const device = computed(() => {
  return windowWidth.value <= 750 ? 'mobile' : 'desktop'
})

const toggleMobileNav = () => {
  mobileNav.value = !mobileNav.value
}

const toggleProfileMenu = () => { 
  store.commit('menu/SET_PROFILE_MENU')
}

const logoutUser = async () => {
  store.commit("app/SET_LOADING", true)
  const data = store.getters['vuello/getVuelloDatas']  
  await store.dispatch('user/logoutUser', {data})
  store.commit("app/SET_LOADING", false)
}

watch(windowWidth, () => {
  if (device.value === 'desktop') {
    mobileNav.value = false
  }
})

</script>

<style lang="scss" scoped>
@import "@/assets/scss/identityForm.scss";
.box-shadow {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.link {
  @apply px-[8px] hover:text-funsugarMain duration-300;
}

.mobileNav-link {
  @apply text-center py-[15px] hover:text-funsugarMain duration-300;
}


.nav-links {
  flex: 1;

  ul {
    .link {
      margin-right: 32px;
    }

    .link:last-child {
      margin-right: 0;
    }
  }
}

.profile-menu {
  .info {
    .initials {
      position: initial;
    }

    .right {
      flex: 1;
      margin-left: 24px;

      p:nth-child(1) {
        font-size: 14px;
      }

      p:nth-child(2),
      p:nth-child(3) {
        font-size: 12px;
      }
    }
  }

  .options {
    padding: 15px;

    .option {
      text-decoration: none;
      color: #fff;
      display: flex;
      align-items: center;
      margin-bottom: 12px;

      .icon {
        width: 18px;
        height: auto;
      }

      p {
        font-size: 14px;
        margin-left: 12px;
      }

      &:last-child {
        margin-bottom: 0px;
      }
    }
  }
}

.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: all 1s ease;
}

.mobile-nav-enter {
  transform: translateX(-100px);
}

.mobile-nav-enter-to {
  transform: translateX(0);
}

.mobile-nav-leave-to {
  transform: translateX(-250px);
}
</style>
