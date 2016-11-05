<template lang="html">
  <div>
    <canvas ref="canvas" :width="width" :height="height"></canvas>
  </div>
</template>

<script>
import { fabric } from 'fabric'
import { ACTIONS, NOOP } from './canvas-actions'

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
      this.setupCommandHandler()
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

    setupCommandHandler: function() {
      this.$watch('action', function(command) {
        this.getAction().init({ canvas: this.canvas })
      })

      this.canvas.on('mouse:down', (e) => {
        this.getAction().mousedown({ canvas: this.canvas, ...e })
      })

      this.canvas.on('mouse:up', (e) => {
        this.getAction().mouseup({ canvas: this.canvas, ...e })
      })

      this.canvas.on('mouse:move', (e) => {
        this.getAction().mousemove({ canvas: this.canvas, ...e })
      })
    },

    getAction: function() {
      return ACTIONS[this.action] || ACTIONS[NOOP]
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
