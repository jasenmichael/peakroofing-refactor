import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      subDir: (process.env.SUB_DIR || ""),
      pages: {},
      menus: {
        // main: [],
        // footer: []
      },
      galleries: {}
    }),
    mutations: {},
    actions: {}
  })
}

export default createStore