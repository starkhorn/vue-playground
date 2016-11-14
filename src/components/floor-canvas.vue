<template lang="html">
  <div>
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

  props: ['floor', 'width', 'height'],

  computed: {
    dimensions() {
      return _.pick(this, 'width', 'height')
    },

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

    this.$watch('dimensions', this.updateDimensions, {
      immediate: true
    })

    this.$emit('ready', {
      canvas: this.canvas
    })
  },

  methods: {
    updateImage(image) {
      // TODO: implement panning
      this.canvas.setBackgroundImage(image, () => this.invalidate())
    },

    updateDimensions(dimensions) {
      this.canvas.setDimensions(dimensions)
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

<style lang="css">
</style>
