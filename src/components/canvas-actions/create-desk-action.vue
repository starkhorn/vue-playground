<template lang="html">
  <a href="#" :class="{ 'is-active': active }">{{ title }}</a>
</template>

<script>
import { CREATE_DESK } from 'store/types'
import DeskShape from 'components/fabric/desk'

export default {
  props: ['title', 'active', 'canvas'],

  watch: {
    active: function(active) {
      if (active) {
        this.activate()
      } else {
        this.deactivate()
      }
    }
  },

  created: function() {
    this.canvasEvents = {
      'mouse:down': this.canvasMousedown.bind(this),
      'mouse:up': this.canvasMouseup.bind(this),
      'mouse:move': this.canvasMousemove.bind(this)
    }
  },

  methods: {
    activate: function() {
      this.canvas.selection = false
      this.canvas.on(this.canvasEvents)
    },

    deactivate: function() {
      this.canvas.selection = true
      this.canvas.off(this.canvasEvents)
    },

    canvasMousedown({ e }) {
      const alreadyHasObject = this.canvas.findTarget(e)
      if (alreadyHasObject) {
        return
      }

      this.origin = this.canvas.getPointer(e)
      this.deskOverlay = new DeskShape()
      this.canvas.add(this.deskOverlay)
    },

    canvasMouseup(options) {
      const deskOverlay = this.deskOverlay
      if (!deskOverlay) {
        return
      }

      this.$store.dispatch(CREATE_DESK, {
        desk: deskOverlay.toEntity()
      })

      this.deskOverlay.remove()
      this.deskOverlay = null
    },

    canvasMousemove({ e }) {
      if (!this.deskOverlay) {
        return
      }

      const pointer = this.canvas.getPointer(e)
      const dx = pointer.x - this.origin.x
      const dy = pointer.y - this.origin.y

      this.deskOverlay.set({
        left: this.origin.x + Math.min(0, dx),
        top: this.origin.y + Math.min(0, dy),
        width: Math.abs(dx),
        height: Math.abs(dy)
      })

      this.deskOverlay.setCoords()
      this.canvas.renderAll()
    }
  }
}
</script>

<style lang="css">
</style>
