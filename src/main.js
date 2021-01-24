import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import holoUI from '@/lib/holo-ui'
import './assets/css/common.css'
import './assets/font-icon/iconfont.css'

Vue.config.productionTip = false
Vue.use(holoUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
