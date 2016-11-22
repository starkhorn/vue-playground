<template lang="html">
  <div>
    <h2 class="title is-2">Login Placeholder</h2>
    <button class="button" @click="login">Login!</button>
  </div>
</template>

<script>
import store from 'store'
import { AUTHENTICATE } from 'store/types'

export default {
  methods: {
    login: function() {
      store.dispatch(AUTHENTICATE).then(() => {
        this.$router.push('home')
      })
    }
  }
}
</script>

<style lang="css"></style>
