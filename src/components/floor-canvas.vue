<template lang="html">
  <div>
    <canvas ref="canvas">
      <slot></slot>
    </canvas>
  </div>
</template>

<script>
import CustomCanvas from 'components/fabric/canvas.fabric'

export default {

  props: ['image', 'width', 'height'],

  data() {
    return {
      canvas: null
    }
  },

  computed: {
    dimensions() {
      return {
        width: this.width,
        height: this.height
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.canvas = new CustomCanvas(this.$refs.canvas, {
        uniScaleTransform: true
      })

      this.$watch('image', this.updateImage, {
        immediate: true
      })

      this.$watch('dimensions', this.updateDimensions, {
        immediate: true
      })

      this.$emit('ready', {
        canvas: this.canvas
      })
    })
  },

  methods: {
    updateImage(image) {
      // TODO: implement panning
      this.canvas.setBackgroundImage(image, this.canvas.renderAll.bind(this.canvas))
    },

    updateDimensions(dimensions) {
      this.canvas.setDimensions(dimensions)
    }
  }
}
</script>

<style lang="css">
</style>
