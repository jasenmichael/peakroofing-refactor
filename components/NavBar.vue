<template>
<div>
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img src="/logo.png" width="48" height="48">
      </a>

      <a 
        role="button" 
        class="navbar-burger burger" 
        aria-label="menu" aria-expanded="false" 
        data-target="navbarBasicExample"

        v-on:click="showNav = !showNav" v-bind:class="{ 'is-active' : showNav }"
        
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div 
      id="navbarBasicExample" 
      class="navbar-menu"
      v-bind:class="{ 'is-active' : showNav }"
    >
      <div class="navbar-start">
        <nuxt-link class="navbar-item" v-for="(item, index) in mainMenu" v-bind:key="index" :to="item.link.url.replace($store.state.subDir, '')" v-html="item.link.title"/>
      </div>
    </div>
  </nav>
</div>
</template>

<script>
import { getMenu } from '~/lib/api'

export default {
  data() {
  return {
    showNav: false,
    mainMenu: this.$store.state.menus.main
    }
  },
  created() {
    this.getMainMenu("main")
  },
  methods: {
    getMainMenu(menu) {
      if (!this.mainMenu) {
      return getMenu('main')
        .then((res) => {
        this.$store.state.menus.main = res
        this.mainMenu = res
        })
      }
    }
  }
}

</script>

<style scoped>
pre {
  padding-top: 4em;
}
</style>