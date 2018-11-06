import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      currentPath: "/",
      pages: {
          home: {
              path: "/home"
          },
          about: {
              path: "/about"
          }
      },
      menus: {},
      galleries: {}
    }),
    mutations: {},
    actions: {}
  })
}

export default createStore