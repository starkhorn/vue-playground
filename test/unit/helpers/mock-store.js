import { createStore as createRealStore } from 'store'
import _ from 'lodash'

export function createStore(options) {
  const floors = _.range(1, 3).map(floorId => {
    return {
      id: floorId,
      desks: _.range(1, 10).map(deskId => ({ id: deskId }))
    }
  })

  const plans = [{
    id: 1,
    buildings: [{
      id: 1,
      floors: floors
    }]
  }]

  return createRealStore({
    strict: false,

    state: {
      plans,

      planId: 1,
      floorId: 1,
      deskId: 1
    },

    ...options
  })
}
