import getters from './getters'

const state = {
  isLogin: false
}

export default {
  state,
  actions: require('./actions').default,
  getters,
  mutations: require('./mutations').default
}
