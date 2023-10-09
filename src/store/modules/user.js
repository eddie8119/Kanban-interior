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

export const user = {
  namespaced: true,
  state() {
    return {
      user: null,
      userTask: null,
      profileId: null,
      profileEmail: null,
      profileUsername: null,
      profileInitials: null,
      checkAuthentication: false,
    }
  },

  mutations: {
    SET_USER(state, payload) {
      state.user = payload
    },
    SET_PROFILE_ID(state, payload) {
      state.profileId = payload
    },
    SET_PROFILE_USERNAME(state, payload) {
      state.profileUsername = payload
    },
    SET_USER_TASK(state, dbResults) {
      state.userTask = dbResults.task
    },
    SET_PROFILE_INFO(state, dbResults) {
      state.profileEmail = dbResults.email
      state.profileUsername = dbResults.username
    },
    SET_PROFILE_INFO_INIT(state) {
      state.profileEmail = null
      state.profileUsername = null
      state.userTask = null
    },
    SET_PROFILE_INITIALS(state) {
      state.profileInitials = state.profileUsername.match(/(\b\S)?/g).join('')
    },
    SET_CHECKAUTHENTICATION(state, payload) {
      state.checkAuthentication = payload
    },
  },

  actions: {
    async registerUser({}, payload) {
      const { formData, data } = payload
      await createUserWithEmailAndPassword(
        fbAuth,
        formData.email,
        formData.password
      )
        .then((res) => {
          if (res) {
            const userId = fbAuth.currentUser.uid
            try {
              setDoc(doc(db, 'users', userId), {
                username: formData.username,
                password: formData.password,
                email: formData.email,
                task: data,
              })
            } catch (err) {
              alert('創建帳號失敗:', err)
            }
            alert('註冊成功')
            commit('SET_CHECKAUTHENTICATION', true)
          }
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            alert('此Email已經註冊')
          }
        })
    },
    async loginUser(state, payload) {
      const router = useRouter()
      await signInWithEmailAndPassword(fbAuth, payload.email, payload.password)
        .then(async (res) => {
          if (res.user.uid) {
            alert('登入成功')
            commit('SET_CHECKAUTHENTICATION', true)
          } else {
            alert('尚未登入')
          }
        })
        .catch((err) => {
          if (
            err.code === 'auth/user-not-found' ||
            err.code === 'auth/wrong-password'
          ) {
            alert('無效憑證, 在確認一次輸入')
          }
        })
    },
    async logoutUser({ dispatch }, payload) {
      const { data } = payload
      const userId = fbAuth.currentUser.uid
      const userDocRef = doc(db, 'users', userId)
      await updateDoc(userDocRef, {
        task: data,
      })
      await signOut(fbAuth)
        .then(() => {
          dispatch('cleanInfo')
          alert('帳號成功登出')
        })
        .catch((err) => {
          console.log(err.message)
        })
    },
    handleAuthStateChanged({ commit, dispatch, state }) {
      const router = useRouter()
      onAuthStateChanged(fbAuth, async (user) => {
        if (user) {
          commit('SET_USER', user)
          commit('SET_PROFILE_ID', user.uid)
          const docSnap = await getDoc(doc(db, 'users', user.uid))
          const dbResults = docSnap.data()
          commit('SET_PROFILE_INFO', dbResults)
          commit('SET_USER_TASK', dbResults)
        } else {
          await router.replace('/')
          dispatch('cleanInfo')
        }
      })
    },
    async cleanInfo({ commit }) {
      commit('SET_USER', null)
      commit('SET_PROFILE_INFO_INIT')
      commit('SET_PROFILE_ID', null)
      commit('SET_CHECKAUTHENTICATION', false)
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
  },
  getters: {
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
    getCheckAuthentication(state) {
      return state.checkAuthentication
    },
  },
}
