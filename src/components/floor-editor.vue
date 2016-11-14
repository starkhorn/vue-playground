<template>
<div>
  <tools-panel :menus="tools.menus" :canvas="canvas.instance" ref="tools"/>

  <div :style="style.canvasContainer">
    <div class="container is-fluid is-marginless">
      <floor-canvas :width="canvas.width" :height="canvas.height" :floor="floor" @ready="canvas.instance=$event.canvas" ref="floorCanvas" />
    </div>
  </div>

  <info-panel @toggled="info.show = $event.show" v-show="info.show" ref="info" />

</div>
</template>

<script>
import FloorCanvas from 'components/floor-canvas'
import ToolsPanel from 'components/tools-panel'
import InfoPanel from 'components/info-panel'
import CreateDeskCommand from 'components/canvas-commands/create-desk'

export default {
  components: {
    FloorCanvas,
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
      width: 180
    },

    info: {
      show: false,
      width: 250
    }
  }),

  computed: {
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
