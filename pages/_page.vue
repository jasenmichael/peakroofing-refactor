<template>
    <section class="container">
      <h1>this is a {{ type }} with the name: {{ name }}, and path: {{ path }} </h1>
      <pre> {{ pageContent }} </pre>
    </section>
</template>

<script>
import { getPageContentByPath } from '~/lib/api'

export default {
  layout: 'page',
  data() {
    return {
      name: this.$nuxt.$route.params.page,
      path: this.$nuxt.$route.path,
      type: this.$nuxt.$route.name,
      pageContent: this.$store.state.pages[this.$nuxt.$route.params.page]
    }
  },
  created() {
    // here we explicitly passing "home", we can re-use this in our _page.vue
    // but we need the query to filter by url alias - see getPageContentByPath function in api.js
    this.getPageContentByPath(this.path)
  },
  methods: {
    getPageContentByPath(path) {
      console.log(path)
      if (this.$store.state.pages[this.name] === undefined ) {
      return getPageContentByPath(this.path)
        .then((res) => {
        this.$store.state.pages[this.name] = res.data[0].attributes
        // this.pageContent = res.data[0].attributes
        this.pageContent = this.$store.state.pages[this.name]
        })
      }
      else {
        this.pageContent = this.$store.state.pages[this.name]
      }
    }
  }
}
</script>

<style scoped>
h1 {
  padding-top: 4em;
}

img {
  /* width: 40vw; */
  max-width: 400px;
  float: left;
  margin: 0.4rem 0.4rem -0.6rem;
  padding: 3px 6px 1px 0;
}
</style>
