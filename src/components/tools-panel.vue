<template lang="html">
  <aside class="menu sidebar" :style="style.sidebar">
    <p class="menu-label">Tools</p>
    <ul class="menu-list">
      <li v-for="menu in menus" @click.prevent="toggleMenu(menu.title)">
        <component :is="menu.command" :canvas="canvas" :title="menu.title" :active="selectedMenu === menu.title" ref="menus" />
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  props: {
    canvas: Object,
    menus: Array,
    width: {
      type: Number
    }
  },

  data() {
    return {
      selectedMenu: null
    }
  },

  computed: {
    style() {
      return {
        sidebar: {
          width: `${this.width}px`
        }
      }
    }
  },

  methods: {
    toggleMenu(menu) {
      if (this.selectedMenu !== menu) {
        this.selectedMenu = menu
      } else {
        this.selectedMenu = null
      }
    }
  }
}
</script>

<style lang="css" scoped>
  .sidebar {
    position: fixed;
    top: 50px;
    left: 0;
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

  .sidebar .menu-label {
    padding-left: 5px;
  }
</style>
