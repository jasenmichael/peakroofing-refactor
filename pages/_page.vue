<template>
  <div v-if="route === null">
    <section class="has-text-centered">
      <h1 class="is-size-4">Oops.. "{{ this.$nuxt.$route.params.page }}" not found...</h1>
      <h2 class="fourzerofour">404</h2>
    </section>  
  </div>
  <div v-else>
    <section class="container">
      <h1 class="is-size-1" v-html="route.nodeContext.title"/>
      <div class="container" v-html="route.nodeContext.body.value.replace('/sites/', 'http://api1.majaqu.com/sites/')" />
      <div>
        <hr>
        <pre class="is-size-7 has-text-light has-background-dark">Name: {{ this.name }}
        <br>Path: {{ this.path }}
        <br>payload: {{ route }} </pre>     
        <div :class="['network',online ? 'online' : 'offline']">
          <div class="circle"></div>
            {{ online ? 'online' : 'offline' }}
        </div>
      </div>
    </section>
  </div>

</template>

<script>
// https://github.com/vuejs/vuex-router-sync
// import { sync } from 'vuex-router-sync'
import Logo from "~/components/Logo.vue";
import pageQuery from "~/queries/pageQuery.gql";

export default {
  components: { Logo },
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
      prefetch: ({ route }) => ({ path: route.path }),
      query: pageQuery,
      variables() {
        return {
          path: this.$route.path
        };
      }
    }
  },
  beforeCreate() {},
  beforeMount() {
    // this.getPagePayload()
  },
  mounted() {
    if (!window.navigator) {
      this.online = false;
      return;
    }
    this.online = Boolean(window.navigator.onLine);
    window.addEventListener("offline", this._toggleNetworkStatus);
    window.addEventListener("online", this._toggleNetworkStatus);
  },
  methods: {
    _toggleNetworkStatus({ type }) {
      this.online = type === "online";
    }
  },
  destroyed() {
    window.removeEventListener("offline", this._toggleNetworkStatus);
    window.removeEventListener("online", this._toggleNetworkStatus);
  }
};
</script>

<style>
.network .circle {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  background: green;
  padding: 0.1rem 0.5rem;
  border-radius: 1rem;
}

.network.offline .circle {
  background: red;
}

img {
  width: 40vw;
  float: left;
  margin: 0.4rem 0.4rem -0.6rem;
  padding: 3px 6px 1px 0;
}

/* pre {
  text-decoration-color: white;
  white-space: pre-wrap;
  background: black;
} */

.fourzerofour {
  font-size: 800%;
}
</style>