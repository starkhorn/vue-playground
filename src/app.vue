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
      <floor-editor :floor="floor"></floor-editor>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import FloorEditor from './components/floor-editor'
import { FETCH_FLOOR } from './store/types'

export default {
  name: 'app',

  computed: mapState([
    'floor'
  ]),

  components: {
    FloorEditor
  },

  created: function() {
    this.$store.dispatch(FETCH_FLOOR)
  }
}
</script>

<style lang="scss">@import 'node_modules/bulma/bulma';</style>
