import { createStore as createRealStore } from 'store'
import _ from 'lodash'

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

const selectedPlan = plans[0]
const selectedFloor = selectedPlan.buildings[0].floors[0]
const selectedDesk = selectedFloor.desks[0]

export function createStore(options) {
  return createRealStore({
    strict: false,

    state: {
      plans,

      selectedPlan,
      selectedFloor,
      selectedDesk
    },

    ...options
  })
}
