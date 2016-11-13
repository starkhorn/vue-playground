<template>
<div>
  <tools-panel :menus="tools.menus" :canvas="canvas.instance" ref="tools"/>

  <div :style="style.canvasContainer">
    <div class="container is-fluid is-marginless">
      <floor-canvas :width="canvas.width" :height="canvas.height" :image="image" @ready="canvas.instance=$event.canvas">
        <desk v-for="desk in desks" ref="desks" :desk="desk" />
      </floor-canvas>
    </div>
  </div>

  <info-panel @toggled="info.show = $event.show" v-show="info.show" ref="info" />

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
    canvas: {
      instance: null,
      width: 0,
      height: window.innerHeight
    },

    tools: {
      menus: [{
        title: 'New Desk',
        command: CreateDeskCommand
      }],
      width: 0
    },

    info: {
      show: false,
      width: 0
    }
  }),

  computed: {
    image() {
      return this.floor && this.floor.image
    },

    desks() {
      return this.floor && this.floor.desks
    },

    availableWidth() {
      return window.innerWidth - this.tools.width
    },

    style() {
      return {
        canvasContainer: {
          'margin-left': `${this.tools.width}px`,
          'margin-right': `${this.availableWidth - this.canvas.width}px`
        }
      }
    }
  },

  watch: {
    'info.show': {
      immediate: true,
      handler: function(show) {
        if (show) {
          this.canvas.width = this.availableWidth - this.info.width
        } else {
          this.canvas.width = this.availableWidth
        }
      }
    }
  },

  mounted() {
    this.info.width = this.$refs.info.width
    this.tools.width = this.$refs.tools.width
  }
}
</script>

<style lang="css" scoped>
</style>
