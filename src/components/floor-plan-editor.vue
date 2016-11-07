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
      <floor-canvas @ready="canvas=$event.canvas" :width="1024" :height="768" :image="image">
        <desk v-for="desk in desks" :canvas="canvas" :id="desk.id" :x="desk.x" :y="desk.y" :width="desk.width" :height="desk.height" />
      </floor-canvas>
    </div>
  </div>
</div>
</template>

<script>
import FloorCanvas from './floor-canvas'
import Desk from './desk'
import { CREATE_DESK } from './canvas-actions'

export default {
  components: {
    FloorCanvas,
    Desk
  },

  props: ['floor'],

  data: () => ({
    canvas: null,
    activeAction: null,
    CREATE_DESK
  }),

  computed: {
    image: function() {
      return this.floor && this.floor.image
    },

    desks: function() {
      return this.floor && this.floor.desks
    }
  },

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
