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
    events: [],
    location: {
      lat: null,
      long: null,
      accu: null
    },
    userdetails: []
  },
  mutations: {
    setUser: (state, payload) => {
      state.user = payload
    },
    gotEvents: (state, payload) => {
      state.events.push(payload)
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
    }
  },
  actions: {
    getData ({commit}, payload) {
      return firebase.database().ref('events')
        .on('value', snap => {
          const myObj = snap.val()
          const keys = Object.keys(snap.val())
          keys.forEach(key => {
            const eventdetails = {}
            eventdetails.avatar = myObj[key].avatar
            eventdetails.descriere = myObj[key].descriere
            eventdetails.id = myObj[key].id
            eventdetails.prezenta = myObj[key].prezenta
            eventdetails.titlu = myObj[key].titlu
            eventdetails.data = new Date(myObj[key].data)
            commit('gotEvents', eventdetails)
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
              datana: payload.datana
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
    }
  },
  getters: {
    events: state => state.events,
    user: state => state.user,
    location: state => state.location,
    userdetails: state => state.userdetails,
    keysUsers: state => state.keysUsers
  }
})