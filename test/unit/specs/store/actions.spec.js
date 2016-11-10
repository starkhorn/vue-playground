import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import * as types from 'store/types'
import store from 'store'

describe('A store', function () {
  beforeEach(function () {
    this.server = new MockAdapter(axios)
  })

  afterEach(function () {
    this.server.restore()
  })

  describe('"FETCH_PLANS" action', function () {
    it('calls the /api/plans and set plans to the response', function () {
      const expectedPlans = [{
        id: 1
      }]

      this.server.onGet('/api/plans').reply(200, expectedPlans)

      return store.dispatch(types.FETCH_PLANS)
        .then(() => {
          expect(store.state.plans).to.equal(expectedPlans)
        })
    })
  })

  describe('"CREATE_DESK" action', function () {
    it('adds a new desk to the floor', async function () {
      store.state.floor = {
        desks: []
      }

      const payload = {
        desk: {
          code: 'D0031'
        }
      }

      return store.dispatch(types.CREATE_DESK, payload)
        .then(() => {
          const desks = store.state.floor.desks
          const newDesk = desks[0]

          expect(desks).to.have.lengthOf(1)
          expect(newDesk).to.have.property('code', 'D0031')
          expect(newDesk).to.have.property('id')
        })
    })
  })

  describe('"UPDATE_DESK" action', function () {
    it('updates a desk when its id matched', function () {
      const desks = [{
        id: 1,
        code: 'D0079'
      }, {
        id: 2,
        code: 'D0080'
      }]

      const payload = {
        desk: {
          id: 2,
          code: 'D0050'
        }
      }

      const expected = [{
        id: 1,
        code: 'D0079'
      }, {
        id: 2,
        code: 'D0050'
      }]

      store.state.floor = {
        desks
      }

      return store.dispatch(types.UPDATE_DESK, payload)
        .then(() => {
          expect(store.state.floor.desks).to.deep.equal(expected)
        })
    })

    it('does not update a desk when its id does not match', function () {
      const desks = [{
        id: 1,
        code: 'D0079'
      }]

      const payload = {
        desk: {
          id: 2,
          code: 'D0050'
        }
      }

      store.state.floor = {
        desks
      }

      return store.dispatch(types.UPDATE_DESK, payload)
        .then(() => {
          expect(store.state.floor.desks).to.deep.equal(desks)
        })
    })
  })

  describe('"SELECT_FLOOR" action', function () {
    it('sets the floor as the current floor', function () {
      const floor = {
        desks: []
      }

      store.dispatch(types.SELECT_FLOOR, { floor })
        .then(() => {
          expect(store.floor).to.equal(floor)
        })
    })
  })
})
