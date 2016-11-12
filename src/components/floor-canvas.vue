<template lang="html">
  <div>
    <canvas ref="canvas" :width="width" :height="height">
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

  mounted() {
    this.$nextTick(() => {
      this.canvas = new CustomCanvas(this.$refs.canvas, {
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
      // TODO: implement panning
      this.canvas.setBackgroundImage(image, this.canvas.renderAll.bind(this.canvas))
    }
  }
}
</script>

<style lang="css">
</style>
