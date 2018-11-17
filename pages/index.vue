<template>
    <section class="container">
      <!-- when I uncomment this it works because the state is populated
      but if I hard refresh it is broken -->
      <!-- <h1 v-html='pageContent.title' />
      <div v-html='pageContent.body.value' /> -->
      <hr>
      <h2>this is a {{ type }} with the name: {{ name }}, and path: {{ path }} </h2>
      <pre> {{ pageContent }} </pre>
    </section>
</template>

<script>
import { getPageContentByTitle } from '~/lib/api'

export default {
  layout: 'index',
  data() {
    return {
      name: this.$nuxt.$route.params.page,
      path: this.$nuxt.$route.path,
      type: this.$nuxt.$route.name,
      pageContent: this.$store.state.pages.home
    }
  },
  created() {
    // here we explicitly passing "home", we can re-use this in our _page.vue
    // but we need the query to filter by url alias - see getPageContentByPath function in api.js
    this.getPageContentByTitle("home")
  },
  methods: {
    getPageContentByTitle(title) {
      if (this.$store.state.pages.home === undefined ) {
      return getPageContentByTitle(title)
        .then((res) => {
        this.$store.state.pages.home = res.data[0].attributes
        // this.pageContent = res.data[0].attributes
        this.pageContent = this.$store.state.pages.home
        })
      }
      else {
        this.pageContent = this.$store.state.pages.home
      }
    }
  }
}
</script>

<style>
img {
  /* width: 40vw; */
  max-width: 400px;
  float: left;
  margin: 0.4rem 0.4rem -0.6rem;
  padding: 3px 6px 1px 0;
}
</style>
