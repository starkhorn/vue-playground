import _ from 'lodash'
import * as types from './types'

export default {

  [types.UPDATE_FLOOR](state, { floor }) {
    state.floor = floor
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
  }
}
