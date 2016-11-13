import Vue from 'vue'
import _ from 'lodash'
import FloorEditor from 'components/floor-editor'
import simulateEvent from 'simulateEvent'

describe('A floor editor', function () {
  beforeEach(function(done) {
    this.app = new Vue({
      template: '<floor-editor :floor="floor" ref="editor"/>',
      data: {
        floor: {}
      },
      components: {
        FloorEditor
      }
    }).$mount()

    this.app.$nextTick(() => {
      this.editor = this.app.$refs.editor
      done()
    })
  })

  it('creates desk components for the floor', function (done) {
    const floor = this.app.floor = {
      desks: [{
        id: 1
      }, {
        id: 2
      }]
    }

    this.app.$nextTick(() => {
      const editor = this.editor
      const desks = editor.$refs.desks

      expect(desks).to.have.lengthOf(2)
      expect(desks[0].desk).to.equal(floor.desks[0])
      expect(desks[1].desk).to.equal(floor.desks[1])

      done()
    })
  })

  describe('"New Desk" action menu', function () {
    beforeEach(function (done) {
      document.body.appendChild(this.app.$el)

      const editor = this.editor
      const tools = editor.$refs.tools
      const menus = tools.$refs.menus

      this.newDeskMenu = _.find(menus, { title: 'New Desk' })

      done()
    })

    afterEach(function () {
      document.body.removeChild(this.app.$el)
    })

    it('exists', function () {
      expect(this.newDeskMenu).to.exist
    })

    it('is active when clicked', function (done) {
      simulateEvent(this.newDeskMenu.$el, 'click')

      this.newDeskMenu.$nextTick(() => {
        expect(this.newDeskMenu.active).to.be.true
        done()
      })
    })

    it('is inactive when clicked while active', function (done) {
      // activate
      simulateEvent(this.newDeskMenu.$el, 'click')

      // deactivate
      simulateEvent(this.newDeskMenu.$el, 'click')

      this.newDeskMenu.$nextTick(() => {
        expect(this.newDeskMenu.active).to.be.false
        done()
      })
    })
  })
})
