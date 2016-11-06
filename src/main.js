import Vue from 'vue'
import App from './app'
import store from './store'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  store
})
