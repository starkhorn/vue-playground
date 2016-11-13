import Vue from 'vue'
import fabric from 'fabric'
import createEvent from 'createEvent'
import simulateEvent from 'simulateEvent'
import CreateDesk from 'components/canvas-commands/create-desk'
import DeskShape from 'components/fabric/desk.fabric'
import { createStore } from 'test/unit/helpers/mock-store'

describe('Create Desk command', function () {
  let store

  beforeEach(function (done) {
    store = createStore()

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
      },
      store
    }).$mount()

    this.app.$nextTick(() => {
      this.command = this.app.$refs.command
      done()
    })

    this.createCanvasEvent = (event, options) => {
      return createEvent(this.canvas.getSelectionElement(), event, options)
    }
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

    describe('when pressing a mouse down on the canvas', function () {
      it('adds a desk overlay in the canvas', function () {
        const objectsBefore = [...this.canvas.getObjects()]

        this.command.canvasMousedown({
          e: this.createCanvasEvent('mousedown')
        })

        expect(this.canvas.getObjects()).to.have.lengthOf(objectsBefore.length + 1)
      })

      it('does not add a desk overlay if the location already has a desk', function () {
        this.canvas.add(new DeskShape({
          left: 0,
          top: 0,
          width: 10,
          height: 10
        }))

        const objectsBefore = [...this.canvas.getObjects()]

        this.command.canvasMousedown({
          e: this.createCanvasEvent('mousedown', {
            pointerX: 5,
            pointerY: 5
          })
        })

        expect(this.canvas.getObjects()).to.have.lengthOf(objectsBefore.length)
      })
    })

    describe('when dragging on the canvas', function () {
      it('sets the desk overlay position and dimensions correctly', function () {
        const scenarios = [{
          from: [0, 0],
          to: [20, 50],
          expected: {
            left: 0,
            top: 0,
            width: 20,
            height: 50
          }
        }, {
          from: [50, 20],
          to: [0, 0],
          expected: {
            left: 0,
            top: 0,
            width: 50,
            height: 20
          }
        }]

        scenarios.forEach(({ from, to, expected }) => {
          this.command.canvasMousedown({
            e: this.createCanvasEvent('mousedown', {
              pointerX: from[0],
              pointerY: from[1]
            })
          })

          this.command.canvasMousemove({
            e: this.createCanvasEvent('mousemove', {
              pointerX: to[0],
              pointerY: to[1]
            })
          })

          const overlay = this.command.deskOverlay

          expect(overlay.left).to.equal(expected.left)
          expect(overlay.top).to.equal(expected.top)
          expect(overlay.width).to.equal(expected.width)
          expect(overlay.height).to.equal(expected.height)
        })
      })
    })

    describe('when releasing a mouse on the canvas', function () {
      it('creates a desk', function () {
        const desksBefore = [...store.getters.selectedFloor.desks]

        this.command.canvasMousedown({
          e: this.createCanvasEvent('mousedown', {
            pointerX: 0,
            pointerY: 50
          })
        })

        this.command.canvasMousemove({
          e: this.createCanvasEvent('mousemove', {
            pointerX: 100,
            pointerY: 0
          })
        })

        this.command.canvasMouseup({
          e: this.createCanvasEvent('mouseup')
        })

        const desks = store.getters.selectedFloor.desks
        const newDesk = desks[desks.length - 1]

        expect(desks).to.have.lengthOf(desksBefore.length + 1)
        expect(newDesk.x).to.equal(0)
        expect(newDesk.y).to.equal(0)
        expect(newDesk.width).to.equal(100)
        expect(newDesk.height).to.equal(50)
      })

      it('does not create a desk if not pressing the mouse down first', function () {
        const desksBefore = [...store.getters.selectedFloor.desks]

        this.command.canvasMouseup({
          e: this.createCanvasEvent('mouseup')
        })

        const desks = store.getters.selectedFloor.desks
        expect(desks).to.have.lengthOf(desksBefore.length)
      })
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

    {
      const scenarios = [{
        event: 'mousedown',
        method: 'canvasMousedown'
      }, {
        event: 'mouseup',
        method: 'canvasMouseup'
      }, {
        event: 'mousemove',
        method: 'canvasMousemove'
      }]

      scenarios.forEach(({ event, method }) => {
        it(`does not call a canvas ${event} handler`, sinon.test(function () {
          const handler = sinon.spy(this.command, method)

          simulateEvent(this.canvas.getSelectionElement(), event)

          expect(handler).to.not.have.been.called
        }))
      })
    }
  })
})
