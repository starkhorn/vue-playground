<template>
<div id="app">
  <button type="button" @click="toggleCreateRect">Create</button>

  <my-canvas :width="1024" :height="768" :image="'http://img.friv5games.com/2016/03/21/police-station-floor-plans-l-48401def008c3ef9.jpg'" :command="currentCommand">
  </my-canvas>
</div>
</template>

<script>
import Canvas from './components/Canvas'
import { fabric } from 'fabric'

export default {
  name: 'app',

  components: {
    'my-canvas': Canvas
  },

  data: () => ({
    currentCommand: null
  }),

  methods: {
    toggleCreateRect: function() {
      this.currentCommand = (function(vm) {
        let creatingRect = null
        let origin = null

        return {
          init: function({ canvas }) {
            canvas.selection = false

            creatingRect = new fabric.Rect({
              fill: 'green',
              opacity: 0.2,
              visible: false
            })
          },
          mousedown: function({ e, canvas }) {
            const existingObject = canvas.findTarget(e)
            if (existingObject) {
              return
            }

            origin = canvas.getPointer(e)
            creatingRect.set({
              visible: true
            })

            canvas.add(creatingRect)
          },
          mouseup: function({ e, canvas }) {
            this.init({ canvas: canvas })
          },
          mousemove: function({ e, canvas }) {
            if (!creatingRect.visible) {
              return
            }

            const pointer = canvas.getPointer(e)
            const dx = pointer.x - origin.x
            const dy = pointer.y - origin.y

            creatingRect.set({
              left: origin.x + Math.min(0, dx),
              top: origin.y + Math.min(0, dy),
              width: Math.abs(dx),
              height: Math.abs(dy)
            })

            creatingRect.setCoords()
            canvas.renderAll()
          }
        }
      })(this)
    }
  }
}
</script>

<style>

</style>
