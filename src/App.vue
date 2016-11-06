<template>
<div id="app">
  <nav class="nav has-shadow">
    <div class="container">
      <div class="nav-left">
        <a class="nav-item is-brand" href="#">
          <h3 class="title is-3">Floor Plan Visualizer</h3>
        </a>
      </div>
    </div>
  </nav>

  <div class="section">
    <div class="container">
      <floor-plan-editor :floor="floor"></floor-plan-editor>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import FloorPlanEditor from './components/FloorPlanEditor'

export default {
  name: 'app',

  computed: mapState([
    'floor'
  ]),

  components: {
    FloorPlanEditor
  },

  created: function() {
    this.$store.dispatch('fetchFloor')
  }
}
</script>

<style lang="scss">@import 'node_modules/bulma/bulma';</style>
