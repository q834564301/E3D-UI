import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './assets/css/common.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios

//  页面标题改变 -> meta.title
router.beforeEach((to, from, next) => {
  to.meta && (document.title = to.meta.title)
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
