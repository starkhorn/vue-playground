<template lang="html">
  <div>
    <canvas ref="canvas" :width="width" :height="height">
      <slot></slot>
    </canvas>
  </div>
</template>

<script>
import { fabric } from 'fabric'

export default {

  props: ['image', 'width', 'height'],

  mounted() {
    this.$nextTick(() => {
      this.canvas = new fabric.Canvas(this.$refs.canvas, {
        uniScaleTransform: true
      })

      this.$watch('image', this.updateImage, {
        immediate: true
      })

      this.$emit('ready', {
        canvas: this.canvas
      })
    })
  },

  methods: {
    updateImage(image) {
      if (!image) {
        this.canvas.setBackgroundImage(null)
        this.canvas.renderAll()

        return
      }

      fabric.Image.fromURL(image, (image) => {
        // TODO: implement panning
        // image.scaleToWidth(this.canvas.width)

        this.canvas.setBackgroundImage(image, this.canvas.renderAll.bind(this.canvas))
      })
    }
  }
}
</script>

<style lang="css">
</style>
