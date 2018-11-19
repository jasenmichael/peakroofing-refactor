<template>
    <section class="container">
      <h1 v-html='pageContent.title' />
      <div v-html='pageContent.body.value' />
      <hr>
      <!-- <h2>this is a {{ type }} with the name: {{ name }}, and path: {{ path }} </h2> -->
      <!-- <pre> {{ pageContent }} </pre> -->
      <div>
        <Team/>
      </div>
      <div>
        <home-gallery/>
      </div>
    </section>
</template>

<script>
import { getPageContentByPath } from '~/lib/api'
import HomeGallery from "~/components/HomeGallery.vue"
import Team from "~/components/Team.vue"

export default {
  layout: 'index',
  components: {
    Team,
    HomeGallery
  },
  data() {
    return {
      name: this.$nuxt.$route.params.page,
      path: this.$nuxt.$route.path,
      type: this.$nuxt.$route.name,
      pageContent: this.$store.state.pages.home
    }
  },
  fetch({store, route}) {
    if (store.state.pages[route.params.page] === undefined ) {
      return getPageContentByPath("/about")
        .then((res) => {
        store.state.pages.home = res.data[0].attributes
        this.pageContent = store.state.pages.home
      })
    }
  }
  // created() {
  //   this.getPageContentByTitle("home")
  // },
  // methods: {
  //   getPageContentByTitle(title) {
  //     if (this.$store.state.pages.home === undefined ) {
  //     return getPageContentByTitle(title)
  //       .then((res) => {
  //       this.$store.state.pages.home = res.data[0].attributes
  //       this.pageContent = this.$store.state.pages.home
  //       })
  //     }
  //     else {
  //       this.pageContent = this.$store.state.pages.home
  //     }
  //   }
  // }
}
</script>

<style scoped>
img {
  /* width: 40vw; */
  max-width: 400px;
  float: left;
  margin: 0.4rem 0.4rem -0.6rem;
  padding: 3px 6px 1px 0;
}
</style>
