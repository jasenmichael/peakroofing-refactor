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
    this.getPageContentByPath(this.path)
  },
  methods: {
    getPageContentByPath(path) {
      if (this.$store.state.pages[this.name] === undefined ) {
      return getPageContentByPath(this.path)
        .then((res) => {
        this.$store.state.pages[this.name] = res.data[0].attributes
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
