import Vue from 'vue'
import App from './App'
import store from './store/index'
import Api from './api'
import * as utils from './utils'
import './assets/styles/weui.wxss'

Vue.config.productionTip = false
App.mpType = 'app'
// Api
Vue.prototype.Api = Api
// Vuex store
Vue.prototype.$store = store

// 注册全局方法
Vue.mixin({
  methods: {
    _checkData: utils.checkData
  }
})

const app = new Vue(App)
app.$mount()
