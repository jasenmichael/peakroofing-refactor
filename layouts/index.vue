<template>
  <div>
    <NavBar/>
    <HomeBannerSlides/>
    <nuxt/>
    <Footer/>
  </div>
</template>

<script>
// const pkg = require("~/package")
import HomeBannerSlides from "~/components/HomeBannerSlides.vue"
import NavBar from "~/components/NavBar.vue"
import Footer from "~/components/Footer.vue"


export default {
  components: { NavBar, Footer, HomeBannerSlides },
  data() {
    return {
      // pkg
    }
  }
}
</script>

<style>
.icon {
  text-align: center;
}

.hero {
  padding-top: 2rem;
}
</style>
