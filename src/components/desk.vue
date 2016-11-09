<template lang="html">
  <div>
  </div>
</template>

<script>
import DeskShape from 'components/fabric/desk.fabric'

export default {
  props: ['x', 'y', 'width', 'height', 'id'],

  computed: {
    dimension() {
      return {
        left: this.x,
        top: this.y,
        width: this.width,
        height: this.height,
        scaleX: 1.00,
        scaleY: 1.00
      }
    },

    canvas() {
      return this.$parent.canvas
    }
  },

  watch: {
    dimension(dimension) {
      this.desk.set({
        ...dimension
      })

      this.canvas.renderAll()
    }
  },

  created() {
    this.desk = new DeskShape({
      id: this.id,

      ...this.dimension
    })

    this.canvas.add(this.desk)
  },

  destroyed() {
    this.desk.remove()
  }
}
</script>
