<template>
<div>
  <div class="toolbar">
    <button type="button" @click="toggleCreateDeskActopm">New Desk</button>
  </div>

  <floor-canvas :width="1024" :height="768" :image="floor.image" :action="activeAction" :objects="floor.desks">
  </floor-canvas>
</div>
</template>

<script>
import FloorCanvas from './FloorCanvas'
import { CREATE_DESK } from './canvas-actions'

export default {
  components: {
    FloorCanvas
  },

  props: ['floor'],

  data: () => ({
    activeAction: null
  }),

  methods: {
    toggleCreateDeskActopm: function() {
      this.activeAction = CREATE_DESK
    }
  }
}
</script>

<style lang="css">
</style>
