import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export function createStore(options) {
  return new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',

    state: {
      plans: [],
      floor: null,
      desk: null
    },

    mutations,
    actions,

    ...options
  })
}

export default createStore()
