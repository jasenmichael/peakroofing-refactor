

module.exports = {
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },
  /*
   ** Build configuration
   */
  build: {},
  /*
   ** Headers
   ** Common headers are already provided by @nuxtjs/pwa preset
   */
  head: {},
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#3B8070'
  },
  /*
   ** Customize app manifest
   */
  manifest: {
    theme_color: '#3B8070'
  },
  /*
   ** Modules
   */
  modules: [
    'nuxt-vuex-router-sync',
    '@nuxtjs/pwa',
    '@nuxtjs/apollo',
    '@nuxtjs/dotenv',
    '@nuxtjs/bulma',
    'nuxt-robots-module'
  ],

  // pwa workbox configs
  workbox: {
    // dev: true
  },

  // apollo configs
  apollo: {
    clientConfigs: {
      default: '~/plugins/apollo.js'
    },
    includeNodeModules: true
  }
}