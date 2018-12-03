import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false
import '../static/css/base.css'
import 'mint-ui/lib/style.css'
import mintUI from 'mint-ui'
Vue.use(mintUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
