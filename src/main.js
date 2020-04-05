import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './utils/axios'
import store from './store/index.js'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/yyy.jpg',
  loading: '/yyy.jpg',
  attempt: 1
})

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

Vue.config.productionTip = false
Vue.prototype.$axios=axios
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
