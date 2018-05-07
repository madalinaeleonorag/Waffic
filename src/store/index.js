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
    TypesOfCollaborations: [],
    location: {
      lat: null,
      long: null,
      accu: null
    },
    userdetails: [],
    Destination: null,
    Weather: {
      icon: null,
      temperature: null
    },
    destinationWeather: {
      icon: null,
      temperature: null
    }
  },
  mutations: {
    setUser: (state, payload) => {
      state.user = payload
    },
    gotuserHistory: (state, payload) => {
      const index = state.userHistory.findIndex(obj => obj.key === payload.key)
      if (index !== -1) {
        Vue.set(state.userHistory, index, payload)
      } else {
        state.userHistory.push(payload)
      }
    },
    gotTypesOfCollaborations: (state, payload) => {
      const index = state.TypesOfCollaborations.findIndex(obj => obj.key === payload.key)
      if (index !== -1) {
        Vue.set(state.TypesOfCollaborations, index, payload)
      } else {
        state.TypesOfCollaborations.push(payload)
      }
    },
    gotUsers: (state, payload) => {
      state.userdetails.push(payload)
    },
    getLocation: (state, payload) => {
      state.location = payload
    },
    getKeys: (state, payload) => {
      state.keysHistory = payload
      state.userHistory
        .map((obj, idx) => !payload.includes(obj.key) ? idx : -1)
        .filter(idx => idx !== -1)
        .forEach(idx => (state.userHistory.splice(idx, 1)))
    },
    getKeysUsers: (state, payload) => {
      state.keysUsers = payload
    },
    getDestination: (state, payload) => {
      state.Destination = payload
    },
    getWeather: (state, payload) => {
      state.Weather.icon = payload.icon
      state.Weather.temperature = payload.temperature
    },
    getDestinationWeather: (state, payload) => {
      state.destinationWeather.icon = payload.icon
      state.destinationWeather.temperature = payload.temperature
    }
  },
  actions: {
    getData ({commit}, payload) {
      return firebase.database().ref('userDestinationsHistory/' + this.state.user.uid)
        .on('value', snap => {
          const myObj = snap.val()
          const keys = Object.keys(snap.val())
          keys.forEach(key => {
            commit('gotuserHistory', {'key': key, ...myObj[key]})
          })
          commit('getKeys', keys)
        }, function (error) {
          console.log('Error: ' + error.message)
        })
    },
    getTypesOfCollaborations ({commit}, payload) {
      return firebase.database().ref('TypesOfCollaborations/')
        .on('value', snap => {
          const myObj = snap.val()
          const keys = Object.keys(snap.val())
          keys.forEach(key => {
            commit('gotTypesOfCollaborations', {'key': key, ...myObj[key]})
          })
        }, function (error) {
          console.log('Error: ' + error.message)
        })
    },
    getUserData ({commit}, payload) {
      return firebase.database().ref('UserDetails')
        .on('value', snap => {
          const myObj = snap.val()
          const keysUsers = Object.keys(snap.val())
          keysUsers.forEach(key => {
            const userdetails = {}
            userdetails.BirthDate = myObj[key].BirthDate
            userdetails.Locality = myObj[key].Locality
            userdetails.Name = myObj[key].Name
            userdetails.Surname = myObj[key].Surname
            userdetails.Email = myObj[key].Email
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
            firebase.database().ref('/UserDetails/' + newUser.id).set({
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
    },
    getWeather ({commit}, payload) {
      commit('getWeather', payload)
    },
    getDestinationWeather ({commit}, payload) {
      commit('getDestinationWeather', payload)
      console.log(payload)
    },
    deleteHistory ({state}, payload) {
      console.log(payload)
      firebase.database().ref('/userDestinationsHistory/' + this.state.user.uid + '/' + this.state.keysHistory[payload]).remove()
    }
  },
  getters: {
    userHistory: state => state.userHistory,
    user: state => state.user,
    location: state => state.location,
    userdetails: state => state.userdetails,
    keysUsers: state => state.keysUsers,
    keysHistory: state => state.keysHistory,
    Destination: state => state.Destination,
    Weather: state => state.Weather,
    destinationWeather: state => state.destinationWeather,
    TypesOfCollaborations: state => state.TypesOfCollaborations
  }
})