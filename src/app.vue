<template>
<div id="app">
  <nav class="nav has-shadow">
    <div class="container is-fluid">
      <div class="nav-left">
        <a class="nav-item is-brand" href="#">
          <h3 class="title is-3">Floor Plan Visualizer</h3>
        </a>
      </div>
    </div>
  </nav>

  <div class="section">
    <div class="container is-fluid">
      <floor-editor :floor="selectedFloor"></floor-editor>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import FloorEditor from './components/floor-editor'
import { FETCH_PLANS, SELECT_FLOOR } from './store/types'

export default {
  name: 'app',

  computed: mapState({
    selectedFloor: 'floor'
  }),

  components: {
    FloorEditor
  },

  created() {
    this.fetchPlans()
  },

  methods: {
    async fetchPlans() {
      const { plans } = await this.$store.dispatch(FETCH_PLANS)
      const firstPlan = plans && plans[0]
      const firstBuilding = firstPlan && firstPlan.buildings[0]
      const firstFloor = firstBuilding && firstBuilding.floors[0]

      this.$store.commit(SELECT_FLOOR, { floor: firstFloor })
    }
  }
}
</script>

<style lang="scss">@import '~bulma/bulma';</style>
