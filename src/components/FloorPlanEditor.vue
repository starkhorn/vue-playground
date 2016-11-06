<template>
<div>
  <div class="columns">
    <div class="column">
      <aside class="menu">
        <p class="menu-label">Tools</p>
        <ul class="menu-list">
          <li>
            <a href="#" @click="toggleAction(CREATE_DESK)" :class="activeAction === CREATE_DESK ? 'is-active' : ''">New Desk</a>
          </li>
        </ul>
      </aside>
    </div>
    <div class="column">
      <floor-canvas :width="1024" :height="768" :action="activeAction" :floor="floor" />
    </div>
  </div>
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
    activeAction: null,
    CREATE_DESK
  }),

  methods: {
    toggleAction: function(action) {
      if (this.activeAction !== action) {
        this.activeAction = action
      } else {
        this.activeAction = null
      }
    }
  }
}
</script>

<style lang="css">
</style>
