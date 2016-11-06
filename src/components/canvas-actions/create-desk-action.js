import CanvasAction from './canvas-action'
import { CREATE_DESK } from 'store/types'
import Desk from 'components/fabric/desk'

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
    const alreadyHasObject = this.canvas.findTarget(e)
    if (alreadyHasObject) {
      return
    }

    this.origin = this.canvas.getPointer(e)
    this.newDesk = new Desk()
    this.canvas.add(this.newDesk)
  }

  mouseup(options) {
    const newDesk = this.newDesk
    if (!newDesk) {
      return
    }

    this.store.dispatch(CREATE_DESK, {
      desk: newDesk.toEntity()
    }).then((desk) => {
      newDesk.id = desk.id
    })

    this.newDesk = null
  }

  mousemove({ e }) {
    if (!this.newDesk) {
      return
    }

    const pointer = this.canvas.getPointer(e)
    const dx = pointer.x - this.origin.x
    const dy = pointer.y - this.origin.y

    this.newDesk.set({
      left: this.origin.x + Math.min(0, dx),
      top: this.origin.y + Math.min(0, dy),
      width: Math.abs(dx),
      height: Math.abs(dy)
    })

    this.newDesk.setCoords()
    this.canvas.renderAll()
  }
}
