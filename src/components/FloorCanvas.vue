<template lang="html">
  <div>
    <canvas ref="canvas" :width="width" :height="height"></canvas>
  </div>
</template>

<script>
import { fabric } from 'fabric'
import { ACTIONS, NOOP } from './canvas-commands'

export default {
  props: {
    width: Number,
    height: Number,
    image: String,
    objects: {
      type: Array,
      default: []
    },

    command: String
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
      this.$watch('command', function(command) {
        this.getCommand().init({ canvas: this.canvas })
      })

      this.canvas.on('mouse:down', (e) => {
        this.getCommand().mousedown({ canvas: this.canvas, ...e })
      })

      this.canvas.on('mouse:up', (e) => {
        this.getCommand().mouseup({ canvas: this.canvas, ...e })
      })

      this.canvas.on('mouse:move', (e) => {
        this.getCommand().mousemove({ canvas: this.canvas, ...e })
      })
    },

    getCommand: function() {
      return ACTIONS[this.command] || ACTIONS[NOOP]
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
