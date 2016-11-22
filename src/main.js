import Vue from 'vue'
import App from './app'
import store from './store'
import router from './routes'

/* eslint-disable no-new */
window.app = new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  store,
  router
})
