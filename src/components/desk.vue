<template lang="html">
  <div>
  </div>
</template>

<script>
import DeskShape from 'components/fabric/desk.fabric'

export default {
  props: ['x', 'y', 'width', 'height', 'id'],

  computed: {
    dimensions() {
      return {
        width: this.width,
        height: this.height,
        scaleX: 1.00,
        scaleY: 1.00
      }
    },

    position() {
      return {
        left: this.x,
        top: this.y
      }
    },

    canvas() {
      return this.$parent.canvas
    }
  },

  watch: {
    dimensions(dimensions) {
      this.desk.set({
        ...dimensions
      })

      this.canvas.renderAll()
    },

    position(position) {
      this.desk.setAbsolutePosition(position)
      this.canvas.renderAll()
    },

    canvas: {
      immediate: true,
      handler: function(canvas) {
        if (canvas) {
          canvas.add(this.desk)
        }
      }
    }
  },

  created() {
    this.desk = new DeskShape({
      id: this.id,

      ...this.dimensions,
      ...this.position
    })

    // this.$watch('canvas', (canvas) => {
    //   if (canvas) {
    //     canvas.add(this.desk)
    //   }
    // }, { immediate: true })
  },

  destroyed() {
    this.desk.remove()
  }
}
</script>
