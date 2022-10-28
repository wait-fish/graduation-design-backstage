import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { API } from './util'
import './util/element'
import './assets/fonts/iconfont.css'

Vue.config.productionTip = false

Vue.prototype.$http = API

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
