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

      this.$watch('floor', this.updateFloor, {
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

    updateFloor: function(floor) {
      this.canvas.clear()

      if (!floor) {
        return
      }

      fabric.Image.fromURL(floor.image, (image) => {
        image.scaleToWidth(this.canvas.width)

        this.canvas.setBackgroundImage(image, this.canvas.renderAll.bind(this.canvas))
      })

      this.floor.desks.forEach((object) => {
        this.canvas.add(this.newObject(object))
      })
    },

    newObject: function(object) {
      return new fabric.Rect({
        fill: 'green',
        opacity: 0.2,
        left: object.x,
        top: object.y,
        width: object.width,
        height: object.height
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
