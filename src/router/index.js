import Vue from 'vue'
import Router from 'vue-router'
import top from '@/components/top'
import stream from '@/components/stream'
import Signup from '@/components/Signup'
import Signin from '@/components/Signin'
import List from '@/components/list'
import Listcon from '@/components/listcon'
import Person from '@/components/person'
import Tunes from '@/components/tunes'

import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: 'signin'
    },


    {
      path: '/',
      name: 'top',
      component: top,
      meta: { requiresAuth: true }

    },

    {
      path: '/stream',
      name: 'stream',
      component: stream,
      meta: { requiresAuth: true }

    },

    {
      path: '/list',
      name: 'List',
      component: List,
      meta: { requiresAuth: true }

    },

    {
      path: '/person',
      name: 'Person',
      component: Person,
      meta: { requiresAuth: true }

    },

    {
      path: '/tunes',
      name: 'Tunes',
      component: Tunes,
      meta: { requiresAuth: true }

    },

    {
      path: '/listcon',
      name: 'Listcon',
      component: Listcon,
      meta: { requiresAuth: true }

    },


    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },

    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ]
})

router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  let currentUser = firebase.auth().currentUser
  if (requiresAuth) {
    // このルートはログインされているかどうか認証が必要です。
    // もしされていないならば、ログインページにリダイレクトします。
    if (!currentUser) {
      next({
        path: '/signin',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // next() を常に呼び出すようにしてください!
  }
})

export default router



