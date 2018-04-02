import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@/firebase'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    events: [
      {
        id: 0,
        titlu: 'titlu1',
        avatar: 'https://im-01.gifer.com/fetch/w300-preview/3e/3e15d375c812baaf40f30b083a138820.gif',
        descriere: 'asdhihdckeckj',
        data: new Date('2017-04-11T10:20:30Z'),
        prezenta: true
      },
      {
        id: 1,
        titlu: 'titlu2',
        avatar: 'https://im-01.gifer.com/fetch/w300-preview/3e/3e15d375c812baaf40f30b083a138820.gif',
        descriere: '<b>asdhihdckeckj bsdfjbhsdhfskkkf</b>',
        data: new Date((new Date()).setDate(25)),
        prezenta: false
      },
      {
        id: 2,
        titlu: 'titlu3',
        avatar: 'https://im-01.gifer.com/fetch/w300-preview/3e/3e15d375c812baaf40f30b083a138820.gif',
        descriere: 'asdhihdckeckj',
        data: new Date('2017-07-11T10:20:30Z'),
        prezenta: true
      },
      {
        id: 3,
        titlu: 'titlu4',
        avatar: 'https://im-01.gifer.com/fetch/w300-preview/3e/3e15d375c812baaf40f30b083a138820.gif',
        descriere: 'asdhihdckeckj',
        data: new Date(),
        prezenta: true
      }
    ],
    months: [
      { clickable: true, nume: 'January' },
      { clickable: true, nume: 'February' },
      { clickable: true, nume: 'March' },
      { clickable: false, nume: 'April' },
      { clickable: false, nume: 'May' },
      { clickable: false, nume: 'June' },
      { clickable: false, nume: 'July' },
      { clickable: false, nume: 'August' },
      { clickable: false, nume: 'September' },
      { clickable: false, nume: 'October' },
      { clickable: false, nume: 'November' },
      { clickable: false, nume: 'December' }
    ],
    abonament: [
      {
        titlu: "Locații favorite",
        descriere: "Poți salva mai mult de o locație favorită, pe care o poți accesa instant și activa ca următoarea destinație direct de pe pagina principală."
      },
      {
        titlu:"Reclame?",
        descriere: "Din păcate, reclamele sunt esențiale pentru a putea menține aplicația activă, însă poți contribui prin activarea abonamentului la buna funcționare a aplicației și nu vei mai fi deranjat de reclame."
      },
      {
        titlu:"Istoric extins",
        descriere: "Vrei să vezi destinațiile tale de când ai accesat prima oară aplicația și până astăzi? În acest caz, activarea abonamentului îți oferă un astfel de beneficiu."
      },
      {
        titlu:"Modifică-ți datele oricând",
        descriere: "Ai posibilitatea de modifica orice informație din contul tău oriunde ai fi și oricând ai nevoie."
      }
    ],
  firebase: {
    db: firebase.database()
  },
  user: null,
},
  mutations: {
    setUser: (state, payload) => {
      state.user = payload
    }
  },
  actions: {
    getData () {
      return this.firebase.db.ref('events/').on('value', snap => {
        console.log(firebase.database())
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
            router.push({path: '/'})
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    },
    signIn ({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.uid
            }
            commit('setUser', newUser)
            router.push({ path: '/' })
          }
        )
        .catch(
          error => {
            window.alert(error.message)
          }
        )
    },
    signOut ({commit}) {
      firebase.auth().signOut().then(function () {
        commit('setUser', null)
      }).catch(
        error => {
          window.alert(error.message)
        })
    }
  },
    getters: {
      events: state => state.events,
      months: state => state.months,
      user: state => state.user
  }
})