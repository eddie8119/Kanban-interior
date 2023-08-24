import {
  fbAuth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  setDoc,
  getDoc,
  doc,
} from '../../firebase/firebase'
import { useRouter } from 'vue-router'

const state = {
  user: null,
  userTasks: {},
  profileEmail: null,
  profileUsername: null,
  profileInitials: null,
}

const mutations = {
  SET_USER(state, payload) {
    state.user = payload
  },
  SET_USER_TASKS(state, doc) {
    state.userTasks = doc.data
  },
  SET_PROFILE_INFO(state, doc) {
    state.profileEmail = doc.email
    state.profileUsername = doc.username
  },
  SET_PROFILE_INFO_INIT(state) {
    state.profileEmail = null
    state.profileUsername = null
  },
  SET_PROFILE_INitials(state) {
    state.profileInitials = state.profileUsername.match(/(\b\S)?/g).join("")
  },
}

const actions = {
  async registerUser({ }, payload) {
    const { formData, data } = payload
    await createUserWithEmailAndPassword(fbAuth, formData.email, formData.password)
      .then((res) => {
        if (res) {
          const userId = fbAuth.currentUser.uid
          try {
            setDoc(doc(db, "users", userId), {
              username: formData.username,
              password: formData.password,
              email: formData.email,
              data
            })
          } catch (err) {
            alert("創建帳號失敗:", err)
          }
        }
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          alert("此Email已經註冊")
        }
      })
  },
  loginUser(state, payload) {
    signInWithEmailAndPassword(fbAuth, payload.email, payload.password)
      .then(async res => {
        if (res) {
          alert("登入成功")
        }
      })
      .catch(err => {
        if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
          alert("無效憑證")
        }
      })
  },
  async logoutUser({ dispatch }) {
    await signOut(fbAuth)
      .then(() => {
        commit("SET_USER", null)
        commit('SET_PROFILE_INFO_INIT')
        commit('SET_USER_TASKS', null)
      })
      .catch((err) => {
        console.log(err.message)
      });
  },
  async getCurrentUser({ commit }) {
    onAuthStateChanged(fbAuth, async (user) => {      
      if (user) {
        commit("SET_USER", user)
        const docSnap = await getDoc(doc(db, "users", user.uid))      
        const dbResults = docSnap.data()      
        commit("SET_PROFILE_INFO", dbResults)
        commit('SET_USER_TASKS',dbResults)        
      }
    })
  },
  handleAuthStateChanged({ commit, dispatch }) {
    const router = useRouter()
    console.log("handleAuthStateChanged")
    onAuthStateChanged(fbAuth, async user => {
      if (user) {
        try {
          commit("SET_USER", user)
          const docSnap = await getDoc(doc(db, "users", user.uid))
          const userTasks = docSnap.data()
          commit('SET_USER_TASKS',dbResults)
        } catch (err) {

        }
        if (router.currentRoute.value.name === 'auth') {
          await router.replace('/')
        }
      } else {
        await router.replace('/')
        commit("SET_USER", null)
        commit('SET_PROFILE_INFO_INIT')
        commit('SET_USER_TASKS', null)
      }
    })
  }
}

const getters = {
  getUser(state) {
    return state.user
  },
  getUserTasks(state) {
    return state.userTasks
  },
  getProfileEmail(state) {
    return state.profileEmail
  },
  getProfileUsername(state) {
    return state.profileUsername
  },
  getProfileInitials(state) {
    return state.profileInitials
  },
}

export const user = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}