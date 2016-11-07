<template lang="html">
  <div>
    <canvas ref="canvas" :width="width" :height="height"></canvas>
  </div>
</template>

<script>
import { fabric } from 'fabric'
import { actionInitializer, NOOP } from './canvas-actions'
import Desk from './fabric/desk'

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
      const existingShapes = this.canvas.getObjects()
      const shapes = desks.map((desk) => {
        return new Desk({
          ...desk,

          left: desk.x,
          top: desk.y
        })
      })

      this.canvas.remove(...existingShapes)
      this.canvas.add(...shapes)
    },

    updateAction: function(newAction, oldAction) {
      this.getAction(oldAction).deactivate()
      this.getAction(newAction).activate()
    },

    getAction: function(action) {
      const actions = this.actions = this.actions || actionInitializer(this)

      return actions[action] || actions[NOOP]
    }
  }
}
</script>

<style lang="css" scoped>
</style>
