<template>
    <section class="container">
      <h1>this is a {{ type }} with the name: {{ name }}, and path: {{ path }} </h1>
    </section>
</template>

<script>

export default {
  layout: 'page',
  data() {
    return {
      name: this.$nuxt.$route.params.page,
      path: this.$nuxt.$route.path,
      type: this.$nuxt.$route.name
    };
  },
  mounted () {},
  methods: {},
  destroyed () {}
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
