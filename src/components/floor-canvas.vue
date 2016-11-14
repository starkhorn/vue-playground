<template lang="html">
  <div class="canvas-wrapper">
    <canvas ref="canvas">
    </canvas>

    <div class="desks">
      <desk v-for="desk in desks" :desk="desk" @invalidated="invalidate()" @created="deskCreated($event)" ref="desks" />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import Canvas from 'components/fabric/canvas.fabric'
import Desk from 'components/desk'

export default {
  components: {
    Desk
  },

  props: ['floor'],

  computed: {
    image() {
      return _.get(this, 'floor.image')
    },

    desks() {
      return _.get(this, 'floor.desks')
    }
  },

  mounted() {
    this.canvas = new Canvas(this.$refs.canvas, {
      uniScaleTransform: true
    })

    this.$watch('image', this.updateImage, {
      immediate: true
    })

    this.$emit('ready', {
      canvas: this.canvas
    })
  },

  methods: {
    updateImage(image) {
      this.canvas.setBackgroundImage(image, (img) => {
        if (img) {
          this.canvas.setDimensions({
            width: img.width,
            height: img.height
          })
        }

        this.invalidate()
      })
    },

    invalidate() {
      this.canvas.renderAll()
    },

    deskCreated({ shape }) {
      // use nextTick to wait for this.canvas as it requires mounting the DOM element
      this.$nextTick(() => {
        this.canvas.add(shape)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .canvas-wrapper {
    max-height: 100vh;
    height: calc(100% - 50px);
    overflow: auto;
  }
</style>
