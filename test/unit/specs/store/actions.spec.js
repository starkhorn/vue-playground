import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import actions from 'store/actions'
import * as types from 'store/types'

describe('store actions', function () {
  beforeEach(function () {
    this.server = new MockAdapter(axios)
  })

  afterEach(function () {
    this.server.restore()
  })

  describe('"FETCH_PLANS"', function () {
    it('calls the /api/plans and commits "FETCH_PLANS" mutation', function () {
      const commit = sinon.spy()
      const expectedPlans = [{
        id: 1
      }]

      this.server.onGet('/api/plans').reply(200, expectedPlans)

      actions[types.FETCH_PLANS]({ commit }).then(() => {
        expect(commit).to.have.been.calledOnce()
        expect(commit).to.have.been.calledWith({
          plans: expectedPlans
        })
      })
    })
  })

  describe.skip('"CREATE_DESK"', function () {
    it('commits "CREATE_DESK" mutation with a new desk as a payload', async function () {
      const commit = sinon.spy()
      const payload = {
        desk: {
          code: 'd0031'
        }
      }

      actions[types.CREATE_DESK]({ commit }, payload).then(() => {
        expect(commit).to.have.been.calledOnce()
        expect(commit).to.have.been.calledWith(sinon.match({
          desk: {
            code: 'd0031',
            id: sinon.match.any
          }
        }))
      })
    })
  })
})
