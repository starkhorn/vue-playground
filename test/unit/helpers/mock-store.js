import { createStore } from 'store'

const floor = {
  desks: []
}

const plans = [{
  buildings: [{
    floors: [floor]
  }]
}]

export default createStore({
  state: {
    plans,
    floor
  }
})
