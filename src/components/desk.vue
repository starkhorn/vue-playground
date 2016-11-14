<template lang="html">
  <div>
  </div>
</template>

<script>
import DeskShape from 'components/fabric/desk.fabric'

export default {
  props: {
    desk: {
      default: {}
    }
  },

  computed: {
    dimensions() {
      return {
        width: this.desk.width,
        height: this.desk.height,
        scaleX: 1.00,
        scaleY: 1.00
      }
    },

    position() {
      return {
        left: this.desk.x,
        top: this.desk.y
      }
    }
  },

  watch: {
    dimensions(dimensions) {
      this.deskShape.set({
        ...dimensions
      })

      this.$emit('invalidated')
    },

    position(position) {
      this.deskShape.setAbsolutePosition(position)

      this.$emit('invalidated')
    }
  },

  created() {
    this.deskShape = new DeskShape({
      id: this.desk.id,

      ...this.dimensions,
      ...this.position
    })

    this.$emit('created', { shape: this.deskShape })
  },

  destroyed() {
    this.deskShape.remove()
  }
}
</script>
