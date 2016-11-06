import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    floor: {
      image: 'http://img.friv5games.com/2016/03/21/police-station-floor-plans-l-48401def008c3ef9.jpg',
      desks: [{ 'width': 16, 'height': 25, 'x': 330, 'y': 76 }, { 'width': 13, 'height': 23, 'x': 347, 'y': 78 }, { 'width': 34, 'height': 15, 'x': 327, 'y': 121 }, { 'width': 17, 'height': 25, 'x': 467, 'y': 72 }, { 'width': 16, 'height': 26, 'x': 488, 'y': 71 },
        { 'width': 15, 'height': 26, 'x': 469, 'y': 99 }, { 'width': 18, 'height': 25, 'x': 486, 'y': 98 }, { 'width': 16, 'height': 29, 'x': 467, 'y': 151 }, { 'width': 15, 'height': 30, 'x': 487, 'y': 152 }, { 'width': 21, 'height': 20, 'x': 464, 'y': 183 },
        { 'width': 12, 'height': 19, 'x': 488, 'y': 181 }
      ]
    }
  },
  mutations: {}
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  store
})
