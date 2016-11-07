<template lang="html">
  <div>
  </div>
</template>

<script>
import DeskShape from 'components/fabric/desk'

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
    this.desk = new DeskShape({
      id: this.id,

      ...this.dimension
    })

    if (this.canvas) {
      this.canvas.add(this.desk)
    }
  },

  destroyed: function() {
    this.desk.remove()
  }
}
</script>
