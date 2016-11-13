import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import _ from 'lodash'

Vue.use(Vuex)

export function createStore(options) {
  return new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',

    state: {
      plans: [],

      planId: null,
      floorId: null,
      deskId: null
    },

    mutations,
    actions,

    getters: {
      selectedPlan: function (state) {
        return _.find(state.plans, { id: state.planId })
      },

      selectedFloor: function (state, getters) {
        const plan = getters.selectedPlan

        return plan && _.find(plan.buildings[0].floors, { id: state.floorId })
      },

      selectedDesk: function (state, getters) {
        const floor = getters.selectedFloor

        return floor && _.find(floor.desks, { id: state.deskId })
      }
    },

    ...options
  })
}

export default createStore()
