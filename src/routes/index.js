import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from 'components/login/index'
import Home from 'components/home/index'
import store from 'store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
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

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(route => route.meta.requiresAuth)

  if (requiresAuth && !store.state.auth.authenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
