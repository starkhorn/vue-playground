import Vue from 'vue'
import _ from 'lodash'
import FloorEditor from 'components/floor-editor'

describe('A floor editor', function () {
  it('creates desk components for the floor', function (done) {
    const floor = {
      desks: [{
        id: 1
      }, {
        id: 2
      }]
    }

    const app = createApp({
      data: {
        floor
      }
    })

    app.$nextTick(function () {
      const editor = this.$refs.editor
      const desks = editor.$refs.desks

      expect(desks).to.have.lengthOf(2)
      expect(desks[0].desk).to.equal(floor.desks[0])
      expect(desks[1].desk).to.equal(floor.desks[1])

      done()
    })
  })

  describe('"New Desk" action menu', function () {
    beforeEach(function (done) {
      const body = document.body
      const el = document.createElement('div')

      body.appendChild(el)

      const app = this.app = createApp({
        el
      })

      const editor = app.$refs.editor
      const menus = editor.$refs.menus

      this.newDeskMenu = _.find(menus, { title: 'New Desk' })

      done()
    })

    it('exists', function () {
      expect(this.newDeskMenu).to.exist
    })

    it('is active when clicked', function (done) {
      this.newDeskMenu.$el.click()

      this.newDeskMenu.$nextTick(() => {
        expect(this.newDeskMenu.active).to.be.true
        done()
      })
    })

    it('is inactive when clicked while active', function (done) {
      // activate
      this.newDeskMenu.$el.click()

      // deactivate
      this.newDeskMenu.$el.click()

      this.newDeskMenu.$nextTick(() => {
        expect(this.newDeskMenu.active).to.be.false
        done()
      })
    })
  })

  function createApp(options) {
    return new Vue({
      template: '<floor-editor :floor="floor" ref="editor"/>',
      data: {
        floor: {}
      },
      components: {
        FloorEditor
      },
      ...options
    }).$mount()
  }
})
