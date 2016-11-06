import _ from 'lodash'

export default class CanvasAction {
  constructor(vm) {
    this.canvas = vm.canvas
    this.store = vm.$store
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
