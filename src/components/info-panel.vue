<template lang="html">
  <div class="main" :style="style.main">
    <div class="container is-fluid">
      <h1 class="title">Info Area</h1>
      <h2 class="subtitle">for selected desk</h2>

      <pre>{{JSON.stringify(desk, null, 2)}}</pre>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    width: {
      type: Number
    }
  },

  computed: {
    show() {
      return !!this.desk
    },

    ...mapGetters({
      desk: 'selectedDesk'
    }),

    style() {
      return {
        main: {
          width: `${this.width}px`
        }
      }
    }
  },

  watch: {
    show(value) {
      this.$emit('toggled', { show: value })
    }
  }
}
</script>

<style lang="css" scoped>
  .main {
    position: fixed;
    top: 50px;
    right: 0;
    bottom: 0;
    padding: 20px 0 50px;
    min-width: 45px;
    max-height: 100vh;
    height: calc(100% - 50px);
    background: #fff;
    box-shadow: 0 2px 3px hsla(0,0%,7%,.1),0 0 0 1px hsla(0,0%,7%,.1);
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 1000;
  }
</style>
