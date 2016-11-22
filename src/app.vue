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

  <section class="route-outlet">
    <router-view></router-view>
  </section>
</div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">@import '~bulma/bulma';</style>

<style scoped>
.nav {
  z-index: 1100;
  position: fixed;
  min-width: 100%;
}

.route-outlet {
  padding-top: 50px;
}
</style>
