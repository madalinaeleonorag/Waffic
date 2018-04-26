import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@/firebase'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fb: {
      db: firebase.database()
    },
    user: null,
    keysHistory: [],
    keysUsers: [],
    userHistory: [],
    location: {
      lat: null,
      long: null,
      accu: null
    },
    userdetails: [],
    Destination: null
  },
  mutations: {
    setUser: (state, payload) => {
      state.user = payload
    },
    gotuserHistory: (state, payload) => {
      state.userHistory.push(payload)
    },
    gotUsers: (state, payload) => {
      state.userdetails.push(payload)
    },
    getLocation: (state, payload) => {
      state.location = payload
    },
    getKeys: (state, payload) => {
      state.keysHistory = payload
    },
    getKeysUsers: (state, payload) => {
      state.keysUsers = payload
    },
    getDestination: (state, payload) => {
      state.Destination = payload
    }
  },
  actions: {
    getData ({commit}, payload) {
      return firebase.database().ref('history')
        .on('value', snap => {
          const myObj = snap.val()
          const keys = Object.keys(snap.val())
          keys.forEach(key => {
            const userHistoryDetails = {}
            userHistoryDetails.locfinish = myObj[key].locfinish
            userHistoryDetails.locstart = myObj[key].locstart
            userHistoryDetails.tfinish = myObj[key].tfinish
            userHistoryDetails.tstart = myObj[key].tstart
            userHistoryDetails.data = new Date(myObj[key].data)
            commit('gotuserHistory', userHistoryDetails)
            console.log(userHistoryDetails)
          })
          commit('getKeys', keys)
        }, function (error) {
          console.log('Error: ' + error.message)
        })
    },
    getUserData ({commit}, payload) {
      return firebase.database().ref('users')
        .on('value', snap => {
          const myObj = snap.val()
          const keysUsers = Object.keys(snap.val())
          keysUsers.forEach(key => {
            const userdetails = {}
            userdetails.datana = new Date(myObj[key].datana)
            userdetails.localitate = myObj[key].localitate
            userdetails.nume = myObj[key].nume
            userdetails.prenume = myObj[key].prenume
            userdetails.email = myObj[key].email
            commit('gotUsers', userdetails)
          })
          commit('getKeysUsers', keysUsers)
        }, function (error) {
          console.log('Error: ' + error.message)
        })
    },
    signUp ({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
        user => {
            const newUser = {
              id: user.uid
            }
            commit('setUser', newUser)
            router.push({path: '/map'})
            firebase.database().ref('/users/' + newUser.id).set({
              nume: payload.nume,
              prenume: payload.prenume,
              localitate: payload.localitate,
              datana: payload.datana,
              email: payload.email
            })
          }
        )
        .catch(
          error => {
            window.alert(error)
          }
        )
    },
    AuthChange ({commit}) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          commit('setUser', user)
        } else {
          commit('setUser', null)
        }
      })
    },
    signIn ({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.uid
            }
            commit('setUser', user.uid)
            router.push({ path: '/Map' })
          }
        )
        .catch(
          error => {
            window.alert(error.message)
          }
        )
    },
    getLocation ({commit}, payload) {
      return navigator.geolocation.getCurrentPosition(pos => {
        commit('getLocation', {
          lat: pos.coords.latitude,
          long: pos.coords.longitude,
          acc: pos.coords.accuracy
        })
      },
      error => {
        window.alert(error.message)
      }, {
        enableHighAccuracy: true,
        maximumAge: 0 })
    },
    signOut ({commit}) {
      firebase.auth().signOut().then(function () {
        commit('setUser', null)
        router.push({ path: '/' })
      }).catch(
        error => {
          window.alert(error.message)
        })
    },
    getDestination ({commit}, payload) {
      commit('getDestination', payload)
    }
  },
  getters: {
    userHistory: state => state.userHistory,
    user: state => state.user,
    location: state => state.location,
    userdetails: state => state.userdetails,
    keysUsers: state => state.keysUsers,
    keysHistory: state => state.keysHistory,
    Destination: state => state.Destination
  }
})