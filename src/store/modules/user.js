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
  userDetails: {},
}

const mutations = {
  SET_USER_INF(state, payload) {
    state.userDetails = payload
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
      })
      .catch((err) => {
        console.log(err.message)
      });
  },
  handleAuthStateChanged({ commit, dispatch }) {
    const router = useRouter()

    onAuthStateChanged(fbAuth, async user => {    
      if (user) {
        try {
          const docSnap = await getDoc(doc(db, "users", user.uid))         
          const userDetails = docSnap.data()          
          commit('SET_USER_INF', {
            name: userDetails.username,
            email: userDetails.email,
            data: userDetails.data,
            userId: user.uid
          })
        } catch (err) {
         
        }
        if (router.currentRoute.value.name === 'auth') {
          await router.replace('/')
        }
      } else {
        await router.replace('/')
        commit('SET_USER_INF', null)       
      }
    })
  }
}

const getters = {
  getUserDetails(state) {
    return state.userDetails
  }
}

const userModule = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default userModule