import * as types from './types'
import axios from 'axios'

export default {
  [types.FETCH_PLANS]({ commit }) {
    return axios.get('/api/plans')
      .then(({ data: plans }) => {
        commit(types.FETCH_PLANS, { plans })

        return { plans }
      })
  },

  [types.CREATE_DESK]({ commit, state }, { desk }) {
    const newDesk = {
      ...desk,

      id: Math.random().toString().substring(2, 10)
    }

    commit(types.CREATE_DESK, {
      desk: newDesk
    })

    return newDesk
  },

  [types.UPDATE_DESK]({ commit, state }, { desk }) {
    commit(types.UPDATE_DESK, {
      desk
    })
  }
}
