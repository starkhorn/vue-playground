import * as types from './types'
import axios from 'axios'

const commitThrough = (types) => {
  return types.reduce((memo, type) => {
    return {
      ...memo,
      [type]({ commit }, payload) {
        commit(type, payload)
      }
    }
  }, {})
}

export default {
  [types.FETCH_PLANS]({ commit }) {
    return axios.get('/api/plans')
      .then(({ data: plans }) => {
        commit(types.FETCH_PLANS, { plans })

        return { plans }
      })
  },

  [types.CREATE_DESK]({ commit, getters }, { desk }) {
    const newDesk = {
      ...desk,

      id: Math.random().toString().substring(2, 10)
    }

    commit(types.CREATE_DESK, {
      floor: getters.selectedFloor,
      desk: newDesk
    })

    return newDesk
  },

  [types.UPDATE_DESK]({ commit, getters }, { desk }) {
    const floor = getters.selectedFloor

    commit(types.UPDATE_DESK, { floor, desk })
  },

  ...commitThrough([
    types.SELECT_FLOOR,
    types.SELECT_DESK,
    types.DESELECT_DESK
  ])
}
