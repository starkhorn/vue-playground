<template>
<div>
  <div class="toolbar">
    <button type="button" @click="toggleCreateDeskCommand">New Desk</button>
  </div>

  <floor-canvas :width="1024" :height="768" :image="floor.image" :command="activeCommand" :objects="floor.desks">
  </floor-canvas>
</div>
</template>

<script>
import FloorCanvas from './FloorCanvas'
import { CREATE_DESK } from './canvas-commands'

export default {
  components: {
    FloorCanvas
  },

  props: ['floor'],

  data: () => ({
    activeCommand: null
  }),

  methods: {
    toggleCreateDeskCommand: function() {
      this.activeCommand = CREATE_DESK
    }
  }
}
</script>

<style lang="css">
</style>
