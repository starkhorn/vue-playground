import Vue from 'vue'
import fabric from 'fabric'
import CreateDesk from 'components/canvas-commands/create-desk'

describe('Create Desk canvas command', function () {
  beforeEach(function (done) {
    this.canvas = new fabric.Canvas()
    this.app = new Vue({
      template: '<create-desk :active="active" :title="title" :canvas="canvas" ref="command"/>',
      data: {
        active: false,
        title: null,
        canvas: this.canvas
      },
      components: {
        CreateDesk
      }
    }).$mount()

    this.app.$nextTick(() => {
      this.command = this.app.$refs.command
      done()
    })
  })

  describe('when active', function () {
    beforeEach(function (done) {
      this.app.active = true
      this.app.$nextTick(done)
    })

    it('has class "is-active"', function () {
      expect(this.command.$el.classList.contains('is-active')).to.be.true
    })

    it('prevents selection on the canvas', function () {
      expect(this.canvas.selection).to.be.false
    })
  })

  describe('when inactive', function () {
    beforeEach(function (done) {
      this.app.active = true
      this.app.$nextTick(() => {
        this.app.active = false
        this.app.$nextTick(done)
      })
    })

    it('does not have class "is-active"', function () {
      expect(this.command.$el.classList.contains('is-active')).to.be.false
    })

    it('allows selection on the canvas', function () {
      expect(this.canvas.selection).to.be.true
    })
  })
})
