import _ from 'lodash'
import * as types from './types'

export default {

  [types.FETCH_PLANS](state, { plans }) {
    state.plans = plans
  },

  [types.CREATE_DESK](state, { desk }) {
    state.floor = {
      ...state.floor,

      desks: state.floor.desks.concat(desk)
    }
  },

  [types.UPDATE_DESK](state, { desk }) {
    state.floor = {
      ...state.floor,

      desks: _.map(state.floor.desks, (eachDesk) => {
        return eachDesk.id === desk.id ? desk : eachDesk
      })
    }
  },

  [types.SELECT_FLOOR](state, { floor }) {
    state.floor = floor
  },

  [types.SELECT_DESK](state, { desk }) {
    state.desk = desk
  },

  [types.DESELECT_DESK](state, { desk }) {
    state.desk = null
  }
}
