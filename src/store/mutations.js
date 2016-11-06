import * as types from './types'

export default {

  [types.UPDATE_FLOOR](state, payload) {
    state.floor = payload.floor
  },

  [types.CREATE_DESK](state, payload) {
    state.floor = {
      ...state.floor,

      desks: state.floor.desks.concat(payload.desk)
    }
  }
}
