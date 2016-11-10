<template>
<div>
  <div class="columns">
    <div class="column">
      <aside class="menu">
        <p class="menu-label">Tools</p>
        <ul class="menu-list">
          <li v-for="menu in menus" @click.prevent="toggleMenu(menu.title)">
            <component :is="menu.command" :canvas="activeCanvas" :title="menu.title" :active="activeCanvas && selectedMenu === menu.title" />
          </li>
        </ul>
      </aside>
    </div>
    <div class="column">
      <floor-canvas :width="1024" :height="768" :image="image" @ready="activeCanvas=$event.canvas">
        <desk v-for="desk in desks" :id="desk.id" :x="desk.x" :y="desk.y" :width="desk.width" :height="desk.height" />
      </floor-canvas>
    </div>
  </div>
</div>
</template>

<script>
import FloorCanvas from './floor-canvas'
import Desk from './desk'
import CreateDeskCommand from './canvas-commands/create-desk'

export default {
  components: {
    FloorCanvas,
    Desk
  },

  props: ['floor'],

  data: () => ({
    activeCanvas: null,
    selectedMenu: null,
    menus: [{
      title: 'New Desk',
      command: CreateDeskCommand
    }]
  }),

  computed: {
    image() {
      return this.floor && this.floor.image
    },

    desks() {
      return this.floor && this.floor.desks
    }
  },

  methods: {
    toggleMenu(menu) {
      if (this.selectedMenu !== menu) {
        this.selectedMenu = menu
      } else {
        this.selectedMenu = null
      }
    }
  }
}
</script>

<style lang="css">
</style>
