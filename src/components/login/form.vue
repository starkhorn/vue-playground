<template lang="html">
  <div class="box">
    <div class="form">
      <p class="control has-icon">
        <input type="text" class="input" placeholder="Username">
        <i class="fa fa-user"></i>
      </p>

      <p class="control has-icon">
        <input type="password" class="input" placeholder="Password">
        <i class="fa fa-lock"></i>
      </p>

      <p class="control">
        <button class="button is-success" @click="login">Login</button>
      </p>
    </div>
  </div>
</template>

<script>
import store from 'store'
import { AUTHENTICATE } from 'store/types'

export default {
  methods: {
    login: function() {
      store.dispatch(AUTHENTICATE)
    }
  }
}
</script>

<style lang="css">
</style>
