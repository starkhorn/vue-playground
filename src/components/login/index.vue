<template lang="html">
  <div class="container">
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <login-form />
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from './form'

export default {
  components: {
    LoginForm
  }
}
</script>

<style lang="scss" scoped>
.container {
    margin-top: 30px;
}
</style>
