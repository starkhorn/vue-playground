import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import * as types from 'store/types'
import { createStore } from 'test/unit/helpers/mock-store'

describe('A store', function () {
  let store, server

  beforeEach(function () {
    store = createStore()
    server = new MockAdapter(axios)
  })

  afterEach(function () {
    server.restore()
  })

  describe('"FETCH_PLANS" action', function () {
    it('calls the /api/plans and set plans to the response', function (done) {
      const expectedPlans = [{
        id: 1
      }]

      server.onGet('/api/plans').reply(200, expectedPlans)

      store.dispatch(types.FETCH_PLANS)
        .then(() => {
          expect(store.state.plans).to.equal(expectedPlans)
          done()
        })
    })
  })

  describe('"CREATE_DESK" action', function () {
    it('adds a new desk to the floor', function (done) {
      store.state.floor = {
        desks: []
      }

      const payload = {
        desk: {
          code: 'D0031'
        }
      }

      store.dispatch(types.CREATE_DESK, payload)
        .then(() => {
          const desks = store.state.floor.desks
          const newDesk = desks[0]

          expect(desks).to.have.lengthOf(1)
          expect(newDesk).to.have.property('code', 'D0031')
          expect(newDesk).to.have.property('id')
          done()
        })
    })
  })

  describe('"UPDATE_DESK" action', function () {
    it('updates a desk when its id matched', function (done) {
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

      store.dispatch(types.UPDATE_DESK, payload)
        .then(() => {
          expect(store.state.floor.desks).to.deep.equal(expected)
          done()
        })
    })

    it('does not update a desk when its id does not match', function (done) {
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

      store.dispatch(types.UPDATE_DESK, payload)
        .then(() => {
          expect(store.state.floor.desks).to.deep.equal(desks)
          done()
        })
    })
  })

  describe('"SELECT_FLOOR" action', function () {
    it('sets the floor as the current floor', function (done) {
      const floor = {
        desks: []
      }

      store.dispatch(types.SELECT_FLOOR, { floor })
        .then(() => {
          expect(store.state.floor).to.equal(floor)
          done()
        })
    })
  })

  describe('"SELECT_DESK" action', function () {
    it('sets the selected desk', function (done) {
      const desk = {
        id: 4
      }

      store.dispatch(types.SELECT_DESK, { desk })
        .then(() => {
          expect(store.state.desk).to.equal(desk)
          done()
        })
    })
  })
})
