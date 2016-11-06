import { fabric } from 'fabric'
import CanvasAction from './CanvasAction'

export default class CreateDeskAction extends CanvasAction {

  constructor() {
    super(...arguments)

    this.events = {
      'mouse:down': this.mousedown.bind(this),
      'mouse:up': this.mouseup.bind(this),
      'mouse:move': this.mousemove.bind(this)
    }
  }

  activate() {
    super.activate(...arguments)

    this.canvas.selection = false
  }

  deactivate() {
    super.deactivate(...arguments)

    this.canvas.selection = true
  }

  mousedown({ e }) {
    const existingObject = this.canvas.findTarget(e)
    if (existingObject) {
      return
    }

    this.origin = this.canvas.getPointer(e)
    this.creatingRect = new fabric.Rect({
      fill: 'green',
      opacity: 0.2,
      visible: true
    })

    this.canvas.add(this.creatingRect)
  }

  mouseup(options) {
    let rect = this.creatingRect

    this.store.dispatch('createDesk', {
      desk: {
        width: rect.width,
        height: rect.height,
        x: rect.left,
        y: rect.top
      }
    }).then((desk) => {
      rect.id = desk.id
    })

    this.creatingRect = null
  }

  mousemove({ e }) {
    if (!this.creatingRect) {
      return
    }

    const pointer = this.canvas.getPointer(e)
    const dx = pointer.x - this.origin.x
    const dy = pointer.y - this.origin.y

    this.creatingRect.set({
      left: this.origin.x + Math.min(0, dx),
      top: this.origin.y + Math.min(0, dy),
      width: Math.abs(dx),
      height: Math.abs(dy)
    })

    this.creatingRect.setCoords()
    this.canvas.renderAll()
  }
}
