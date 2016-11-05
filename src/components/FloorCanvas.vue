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
    image: String,
    objects: {
      type: Array,
      default: []
    },

    action: String
  },

  mounted: function() {
    this.$nextTick(() => {
      this.createCanvas()
      this.setupActionHandlers()
      this.populateObjects()
    })
  },

  methods: {
    createCanvas: function() {
      this.canvas = new fabric.Canvas(this.$refs.canvas, {
        uniScaleTransform: true
      })

      fabric.Image.fromURL(this.image, (image) => {
        image.scaleToWidth(this.canvas.width)

        this.canvas.setBackgroundImage(image, this.canvas.renderAll.bind(this.canvas))
      })
    },

    setupActionHandlers: function() {
      this.getAction().activate()

      this.$watch('action', function(newAction, oldAction) {
        this.getAction(oldAction).deactivate()
        this.getAction().activate()
      })
    },

    getAction: function(action) {
      const actions = this.actions = this.actions || actionInitializer(this.canvas)
      const currentAction = this.action

      return actions[action || currentAction] || actions[NOOP]
    },

    populateObjects: function() {
      this.objects.forEach((object) => {
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
    }
  }
}
</script>

<style lang="css" scoped>
</style>
