import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from 'components/login/index'
import Home from 'components/home/index'
import store from 'store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (store.state.auth.authenticated) {
        next(false)
      } else {
        next()
      }
    }
  },
  {
    path: '/home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/*',
    redirect: '/home'
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach(function redirectToLoginWhenNotAuth(to, from, next) {
  const requiresAuth = to.matched.some(route => route.meta.requiresAuth)

  if (requiresAuth && !store.state.auth.authenticated) {
    next('/login')
  } else {
    next()
  }
})

store.watch(state => state.auth.authenticated, function redirectToHomeWhenAuth(authenticated) {
  if (authenticated) {
    router.push('/home')
  }
})

export default router
