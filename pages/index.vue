<template>
    <section class="container">
      <h1 class="is-size-1" v-html="route.nodeContext.title"/>
      <div class="container" v-html="route.nodeContext.body.value.replace('/sites/', 'http://api1.majaqu.com/sites/')" />
    </section>
</template>

<script>
import menuQuery from "~/queries/menuQuery.gql";
import pageQuery from "~/queries/pageQuery.gql";

export default {
  layout: 'index',
  data() {
    return {
      online: true,
      name: this.$nuxt.$route.params.page,
      path: this.$nuxt.$route.path,
      type: this.$nuxt.$route.name
    };
  },
  apollo: {
    route: {
      // prefetch: true,
      prefetch: true,
      query: pageQuery,
      variables() {
        return {
          path: '/home'
        }
      }
    },
    menuByName: {
      prefetch: true,
      query: menuQuery,
      variables() {
        return {
          name: 'main'
        }
      }
    }
  },
  mounted () {
    if (!window.navigator) {
      this.online = false
      return
    }
    this.online = Boolean(window.navigator.onLine)
    window.addEventListener('offline', this._toggleNetworkStatus)
    window.addEventListener('online', this._toggleNetworkStatus)
  },
  methods: {
    _toggleNetworkStatus ({ type }) {
      this.online = type === 'online'
    }
  },
  destroyed () {
    window.removeEventListener('offline', this._toggleNetworkStatus)
    window.removeEventListener('online', this._toggleNetworkStatus)
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
