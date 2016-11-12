import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export function createStore(options) {
  return new Vuex.Store({

    state: {
      plans: [],
      floor: null
    },

    mutations,
    actions,

    ...options
  })
}

export default createStore()
