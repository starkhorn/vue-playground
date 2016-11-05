import _ from 'lodash'

export default class CanvasAction {
  constructor(canvas) {
    this.canvas = canvas
  }

  activate() {
    _.each(this.events || {}, (handler, event) => {
      this.canvas.on(event, handler)
    })
  }

  deactivate() {
    _.each(this.events || {}, (handler, event) => {
      this.canvas.off(event, handler)
    })
  }
}
