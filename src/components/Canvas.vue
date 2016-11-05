<template lang="html">
  <div>
    <canvas ref="canvas" :width="width" :height="height"></canvas>
  </div>
</template>

<script>
import { fabric } from 'fabric'

export default {
  props: {
    width: Number,
    height: Number,
    image: String,
    objects: {
      type: Array,
      default: []
    },

    command: Object
  },

  mounted: function() {
    this.$nextTick(() => {
      this.createCanvas()
      this.setupCommandHandler()
      this.populateRects()
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
        if (this.command && this.command.init) {
          this.command.init({ canvas: this.canvas })
        }
      })

      this.canvas
        .on('mouse:down', (e) => {
          if (this.command) {
            this.command.mousedown({ canvas: this.canvas, ...e })
          }
        })

      this.canvas.on('mouse:up', (e) => {
        if (this.command) {
          this.command.mouseup({ canvas: this.canvas, ...e })
        }
      })

      this.canvas.on('mouse:move', (e) => {
        if (this.command) {
          this.command.mousemove({ canvas: this.canvas, ...e })
        }
      })
    },

    populateRects: function() {
      this.objects.forEach((rect) => {
        this.canvas.add(new fabric.Rect({
          fill: 'green',
          opacity: 0.2,
          left: rect.x,
          top: rect.y,
          width: rect.width,
          height: rect.height
        }))
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
