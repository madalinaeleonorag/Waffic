import Vue from 'vue'
import Vuex from 'vuex'

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
    ]
  },
  mutations: {
  },
  getters: {
    events (state) {
      return state.events
    }
  }
})