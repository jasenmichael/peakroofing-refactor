<template>
  <div>
    <h1>footer yo!</h1>
    <pre v-html="footerMenu" />
  </div>
</template>

<script>
// import axios from 'axios'
import { getMenu } from '~/lib/api'

export default {
  data() {
  return {
    footerMenu: this.$store.state.menus.footer
    }
  },
  created() {
    this.getFooterMenu("footer")
  },
  methods: {
    getFooterMenu(menu) {
      if (!this.footerMenu) {
      return getMenu(menu)
        .then((res) => {
        this.$store.state.menus.footer = res
        this.footerMenu = res
        })
      }
    }
  }
}

</script>

<style>

</style>