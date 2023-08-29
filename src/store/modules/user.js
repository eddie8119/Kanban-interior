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
  updateDoc,
} from '../../firebase/firebase'
import { useRouter } from 'vue-router'

const state = {
  user: null,
  userTask: {},
  profileId: null,
  profileEmail: null,
  profileUsername: null,
  profileInitials: null,
}

const mutations = {
  SET_USER(state, payload) {
    state.user = payload
  },
  SET_USER_TASK(state, doc) {
    state.userTask = doc.task
  },
  SET_PROFILE_ID(state, payload) {
    state.profileId = payload
  },
  SET_PROFILE_USERNAME(state, payload) {
    state.profileUsername = payload
  },
  SET_PROFILE_INFO(state, doc) {   
    state.profileEmail = doc.email
    state.profileUsername = doc.username
  },
  SET_PROFILE_INFO_INIT(state) {
    state.profileEmail = null
    state.profileUsername = null
  },
  SET_PROFILE_INITIALS(state) {
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
              task: data
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
        const userId = fbAuth.currentUser.uid
        setDoc(doc(db, "users", userId), {
          // data
        })

        dispatch("cleanInfo")
      })
      .catch((err) => {
        console.log(err.message)
      })
    alert("帳號成功登出")
  },
  handleAuthStateChanged({ commit, dispatch, state }) {
    console.log("handleAuthStateChanged")
    const router = useRouter()
    onAuthStateChanged(fbAuth, async (user) => {
      if (user) {
        commit("SET_USER", user)
        commit("SET_PROFILE_ID", user.uid)
        const docSnap = await getDoc(doc(db, "users", user.uid))
        const dbResults = docSnap.data()
        commit("SET_PROFILE_INFO", dbResults)
        commit("SET_USER_TASK", dbResults)

        console.log(state.profileUsername)
        console.log(state.profileEmail)
        console.log(state.userTask)
        
      } else {
        await router.replace('/')
        dispatch("cleanInfo")
      }
    })


  },
  async cleanInfo({ commit }) {
    commit("SET_USER", null)
    commit('SET_PROFILE_INFO_INIT')
    commit('SET_USER_TASK', null)
  },
  async updateUserSettings({ commit, state }) {
    // const docRef = doc(db, "users", state.profileId)
    // await updateDoc(docRef, {
    //   username: state.profileUsername,
    //   email: state.profileEmail,
    //   task: state.userTask,
    // })
    // commit("SET_PROFILE_INFO_INIT")
  },
}

const getters = {
  getUser(state) {
    return state.user
  },
  getUserTask(state) {
    return state.userTask
  },
  getProfileId(state) {
    return state.profileId
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