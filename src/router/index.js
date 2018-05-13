import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AccountDetails from '@/components/AccountDetails'
import Help from '@/components/Help'
import History from '@/components/History'
import News from '@/components/News'
import Collaboration from '@/components/Collaboration'
import Map from '@/components/Map'
import AuthGuard from '@/store/authGuard'
import AllUsers from '@/components/AllUsers'
import AllUsersCollaborations from '@/components/AllUsersCollaborations'
import UserCollaborationsHistory from '@/components/UserCollaborationsHistory'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/AccountDetails',
      name: 'AccountDetails',
      component: AccountDetails,
      beforeEnter: AuthGuard
    },
    {
      path: '/UserCollaborationsHistory',
      name: 'UserCollaborationsHistory',
      component: UserCollaborationsHistory,
      beforeEnter: AuthGuard
    },
    {
      path: '/AllUsersCollaborations',
      name: 'AllUsersCollaborations',
      component: AllUsersCollaborations,
      beforeEnter: AuthGuard
    },
    {
      path: '/Map',
      name: 'Map',
      component: Map,
      beforeEnter: AuthGuard
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Help',
      name: 'Help',
      component: Help
    },
    {
      path: '/History',
      name: 'History',
      component: History,
      beforeEnter: AuthGuard
    },
    {
      path: '/AllUsers',
      name: 'AllUsers',
      component: AllUsers,
      beforeEnter: AuthGuard
    },
    {
      path: '/News',
      name: 'News',
      component: News
    },
    {
      path: '/Collaboration',
      name: 'Collaboration',
      component: Collaboration
    }
  ]
})
