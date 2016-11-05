import { fabric } from 'fabric'
import CanvasAction from './CanvasAction'

export default class CreateDeskAction extends CanvasAction {
  init({ canvas }) {
    canvas.selection = false

    this.creatingRect = new fabric.Rect({
      fill: 'green',
      opacity: 0.2,
      visible: false
    })
  }

  mousedown({ e, canvas }) {
    const existingObject = canvas.findTarget(e)
    if (existingObject) {
      return
    }

    this.origin = canvas.getPointer(e)
    this.creatingRect.set({
      visible: true
    })

    canvas.add(this.creatingRect)
  }

  mouseup({ e, canvas }) {
    this.init({ canvas: canvas })
  }

  mousemove({ e, canvas }) {
    if (!this.creatingRect.visible) {
      return
    }

    const pointer = canvas.getPointer(e)
    const dx = pointer.x - this.origin.x
    const dy = pointer.y - this.origin.y

    this.creatingRect.set({
      left: this.origin.x + Math.min(0, dx),
      top: this.origin.y + Math.min(0, dy),
      width: Math.abs(dx),
      height: Math.abs(dy)
    })

    this.creatingRect.setCoords()
    canvas.renderAll()
  }
}
