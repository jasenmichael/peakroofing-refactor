<template>
  <div>
    <nav-bar/>
    <nuxt/>
  </div>
</template>

<script>
import NavBar from '~/components/NavBar.vue'
export default {
  components: {
    NavBar
  },
  data() {
    return {
    }
  }
}
</script>

<style>
.icon {
  text-align: center;
}
</style>
