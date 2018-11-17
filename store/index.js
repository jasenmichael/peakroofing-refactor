import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
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