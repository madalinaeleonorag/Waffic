import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AccountDetails from '@/components/AccountDetails'
import ChangePassword from '@/components/ChangePassword'
import Contact from '@/components/Contact'
import Help from '@/components/Help'
import History from '@/components/History'
import News from '@/components/News'
import Subscriptions from '@/components/Subscriptions'
import Map from '@/components/Map'
import Auth from '@/components/Auth'
import RecoverPsw from '@/components/RecoverPsw'
import SignUp from '@/components/SignUp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/AccountDetails/:uid',
      name: 'AccountDetails',
      component: AccountDetails
    },
    {
      path: '/RecoverPsw',
      name: 'RecoverPsw',
      component: RecoverPsw
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/ChangePassword/:uid',
      name: 'ChangePassword',
      component: ChangePassword
    },
    {
      path: '/Map',
      name: 'Map',
      component: Map
    },
    {
      path: '/Contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/Help',
      name: 'Help',
      component: Help
    },
    {
      path: '/History',
      name: 'History',
      component: History
    },
    {
      path: '/News',
      name: 'News',
      component: News
    },
    {
      path: '/Subscriptions',
      name: 'Subscriptions',
      component: Subscriptions
    }
  ]
})
