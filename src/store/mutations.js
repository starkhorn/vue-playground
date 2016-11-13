import _ from 'lodash'
import * as types from './types'

export default {

  [types.FETCH_PLANS](state, { plans }) {
    state.plans = plans
    state.selectedPlan = plans[0]
  },

  [types.CREATE_DESK](state, { desk }) {
    const floor = state.selectedFloor

    floor.desks.push(desk)
  },

  [types.UPDATE_DESK](state, { desk }) {
    const floor = state.selectedFloor
    const existingDesk = _.find(floor.desks, { id: desk.id })

    // TODO: need tp understand how to access getters here
    // or else we could not use reactive state -- i.e. need to update
    // existing object and its dependencies instead of letting Vue do it
    _.assign(existingDesk, desk)
  },

  [types.SELECT_FLOOR](state, { floor }) {
    // assume 1 building
    const building = state.selectedPlan.buildings[0]

    state.selectedFloor = _.find(building.floors, { id: floor.id })
  },

  [types.SELECT_DESK](state, { desk }) {
    const floor = state.selectedFloor

    state.selectedDesk = _.find(floor.desks, { id: desk.id })
  },

  [types.DESELECT_DESK](state, { desk }) {
    state.selectedDesk = null
  }
}
