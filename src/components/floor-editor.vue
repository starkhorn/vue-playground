<template>
<div>
  <div class="columns">
    <!-- Tools -->
    <div class="column is-1">
      <tools-panel :menus="menus" :canvas="activeCanvas" ref="tools"/>
    </div>

    <!-- Canvas -->
    <div class="column">
      <floor-canvas :width="canvasDimensions.width" :height="canvasDimensions.height" :image="image" @ready="activeCanvas=$event.canvas">
        <desk v-for="desk in desks" ref="desks" :desk="desk" />
      </floor-canvas>
    </div>

    <!-- Info -->
    <div class="column" v-show="infoPanel.show">
      <info-panel @toggled="infoPanel.show = $event.show" />
    </div>
  </div>
</div>
</template>

<script>
import FloorCanvas from './floor-canvas'
import Desk from './desk'
import CreateDeskCommand from './canvas-commands/create-desk'
import ToolsPanel from 'components/tools-panel'
import InfoPanel from 'components/info-panel'

export default {
  components: {
    FloorCanvas,
    Desk,
    ToolsPanel,
    InfoPanel
  },

  props: ['floor'],

  data: () => ({
    activeCanvas: null,

    menus: [{
      title: 'New Desk',
      command: CreateDeskCommand
    }],

    infoPanel: {
      show: false
    }
  }),

  computed: {
    image() {
      return this.floor && this.floor.image
    },

    desks() {
      return this.floor && this.floor.desks
    },

    canvasDimensions() {
      const maxWidth = 1600
      const height = 768

      return {
        width: maxWidth - (this.infoPanel.show ? 200 : 0),
        height
      }
    }
  }
}
</script>

<style lang="css">
  .info-panel {
    background-color: lightblue;
    width: 200px;
  }
</style>
