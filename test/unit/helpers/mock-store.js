import { createStore as createRealStore } from 'store'

const floor = {
  desks: []
}

const plans = [{
  buildings: [{
    floors: [floor]
  }]
}]

export function createStore(options) {
  return createRealStore({
    strict: false,

    state: {
      plans,
      floor,
      desk: null
    },

    ...options
  })
}
