import { fabric } from 'fabric'
import store from 'store'
import { UPDATE_DESK } from 'store/types'

const defaultOptions = {
  fill: 'green',
  opacity: 0.2
}

export default fabric.util.createClass(fabric.Rect, {

  initialize(options) {
    this.callSuper('initialize', {
      ...defaultOptions,
      ...options
    })

    this.on('modified', () => {
      store.dispatch(UPDATE_DESK, {
        desk: this.toEntity()
      })
    })
  },

  toEntity() {
    return {
      id: this.id,
      x: this.left,
      y: this.top,

      // getWidth() !== this.width, same as height? bug?
      width: this.getWidth() - this.strokeWidth,
      height: this.getHeight() - this.strokeWidth
    }
  }
})
