<template lang="html">
  <aside class="menu">
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
  props: ['canvas', 'menus'],

  data() {
    return {
      selectedMenu: null
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

<style lang="css">
</style>
