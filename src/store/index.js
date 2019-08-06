import Vue from 'vue'
import Vuex from 'vuex'

import common from './common/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common
  },
  strict: process.env.NODE_ENV !== 'production'
})
