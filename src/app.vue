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

  <section>
    <floor-editor :floor="floor"></floor-editor>
  </section>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import FloorEditor from './components/floor-editor'
import { FETCH_PLANS, SELECT_FLOOR } from './store/types'

export default {
  name: 'app',

  computed: mapGetters({
    floor: 'selectedFloor'
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

<style scoped>
.nav {
  z-index: 1100;
  position: fixed;
  min-width: 100%;
}
</style>
