<template>
<div>
  <tools-panel :menus="tools.menus" :canvas="canvas.instance" :width="tools.width" ref="tools"/>

  <div :style="style.canvasContainer">
    <div class="container is-fluid is-marginless">
      <floor-canvas :floor="floor" @ready="canvas.instance=$event.canvas" ref="floorCanvas" />
    </div>
  </div>

  <info-panel @toggled="info.show = $event.show" v-show="info.show" :width="info.width" ref="info" />

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
    style() {
      return {
        canvasContainer: {
          'margin-left': `${this.tools.width}px`,
          'margin-right': `${this.info.show ? this.info.width : 0}px`
        }
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
