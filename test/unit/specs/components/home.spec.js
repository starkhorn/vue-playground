import Vue from 'vue'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Home from 'components/home'
import { createStore } from 'test/unit/helpers/mock-store'

describe('Home component', function () {
  let store, server

  beforeEach(function () {
    store = createStore()
    server = new MockAdapter(axios)
  })

  afterEach(function () {
    server.restore()
  })

  it('fetches plans when created', function (done) {
    const expectedFloor = { id: 5 }
    const plans = [{
      buildings: [{
        floors: [expectedFloor]
      }]
    }]

    server.onGet('/api/plans').reply(200, plans)

    const app = new Vue({
      template: '<home />',
      components: {
        Home
      },
      store
    }).$mount()

    app.$watch('$store.state.floorId', (floorId) => {
      expect(floorId).to.equal(expectedFloor.id)

      done()
    })
  })
})
