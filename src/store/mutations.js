import * as types from './types'

export default {

  [types.FETCH_PLANS](state, { plans }) {
    state.plans = plans
    state.planId = plans[0].id
  },

  [types.CREATE_DESK](state, { floor, desk }) {
    floor.desks.push(desk)
  },

  [types.UPDATE_DESK](state, { floor, desk }) {
    floor.desks = floor.desks.map(existing => {
      if (existing.id === desk.id) {
        return desk
      } else {
        return existing
      }
    })
  },

  [types.SELECT_FLOOR](state, { floor }) {
    state.floorId = floor.id
  },

  [types.SELECT_DESK](state, { desk }) {
    state.deskId = desk.id
  },

  [types.DESELECT_DESK](state, { desk }) {
    state.deskId = null
  }
}
