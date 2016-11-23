<template lang="html">
  <floor-editor :floor="floor"></floor-editor>
</template>

<script>
import { mapGetters } from 'vuex'
import FloorEditor from 'components/home/floor-editor'
import { FETCH_PLANS, SELECT_FLOOR } from 'store/types'

export default {
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

<style lang="scss">
</style>
