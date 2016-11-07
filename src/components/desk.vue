<template lang="html">
  <div>
  </div>
</template>

<script>
import { fabric } from 'fabric'
import { UPDATE_DESK } from 'store/types'

export default {
  props: ['canvas', 'x', 'y', 'width', 'height', 'id'],

  computed: {
    dimension: function() {
      return {
        left: this.x,
        top: this.y,
        width: this.width,
        height: this.height,
        scaleX: 1.00,
        scaleY: 1.00
      }
    }
  },

  watch: {
    dimension: function(dimension) {
      this.desk.set({
        ...dimension
      })

      this.canvas.renderAll()
    }
  },

  created: function() {
    this.desk = new fabric.Rect({
      fill: 'green',
      opacity: 0.2,

      ...this.dimension
    })

    this.desk.on('modified', () => {
      this.$store.dispatch(UPDATE_DESK, {
        desk: this.toEntity()
      })
    })

    if (this.canvas) {
      this.canvas.add(this.desk)
    }
  },

  destroyed: function() {
    this.desk.remove()
  },

  methods: {
    toEntity: function() {
      // getWidth() !== this.desk.width, same as height? bug?
      const desk = this.desk
      const width = desk.getWidth() - desk.strokeWidth
      const height = desk.getHeight() - desk.strokeWidth

      return {
        id: this.id,
        x: desk.left,
        y: desk.top,

        width: width,
        height: height
      }
    }
  }
}
</script>
