<template lang="html">
  <div>
    <canvas ref="canvas" :width="width" :height="height"></canvas>
  </div>
</template>

<script>
import { fabric } from 'fabric'
import { actionInitializer, NOOP } from './canvas-actions'

export default {
  props: {
    width: Number,
    height: Number,
    floor: Object,
    action: String
  },

  mounted: function() {
    this.$nextTick(() => {
      this.createCanvas()

      this.$watch('floor.image', this.updateFloorImage, {
        immediate: true
      })

      this.$watch('floor.desks', this.updateFloorDesks, {
        immediate: true
      })

      this.$watch('action', this.updateAction, {
        immediate: true
      })
    })
  },

  methods: {
    createCanvas: function() {
      this.canvas = new fabric.Canvas(this.$refs.canvas, {
        uniScaleTransform: true
      })
    },

    updateFloorImage: function(image) {
      if (!image) {
        this.canvas.setBackgroundImage(null)
        this.canvas.renderAll()

        return
      }

      fabric.Image.fromURL(image, (image) => {
        image.scaleToWidth(this.canvas.width)

        this.canvas.setBackgroundImage(image, this.canvas.renderAll.bind(this.canvas))
      })
    },

    updateFloorDesks: function(desks = []) {
      this.canvas.remove(...this.canvas.getObjects())

      desks.forEach((desk) => {
        let deskShape = new fabric.Rect({
          fill: 'green',
          opacity: 0.2,
          left: desk.x,
          top: desk.y,
          width: desk.width,
          height: desk.height
        })

        this.canvas.add(deskShape)
      })
    },

    updateAction: function(action, oldAction) {
      this.getAction(oldAction).deactivate()
      this.getAction().activate()
    },

    getAction: function(action) {
      const actions = this.actions = this.actions || actionInitializer(this)
      const currentAction = this.action

      return actions[action || currentAction] || actions[NOOP]
    }
  }
}
</script>

<style lang="css" scoped>
</style>
