import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import axios from 'config/axios'
import VueAxios from 'vue-axios'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'common/stylus/index.styl'
import './vux'
import {GlobalComponent} from 'config/global.toml'

/* eslint-disable no-unused-vars */
// import vConsole from 'vconsole'

fastclick.attach(document.body)

Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.use(Mint)

Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})
// 注册全局组件
GlobalComponent.forEach((item) => {
  console.log('[kalix]-[main.js] registry component name is: ' + item.name, '; registry path is: ' + item.path)
  Vue.component(item.name, require('' + item.path).default)
})
// 注册全局过滤器
// GlobalFilter.forEach((item) => {
//   console.log('[kalix]-[main.js] registry filter name is: ' + item.name, '; registry path is: ' + item.path)
//   Vue.filter(item.name, require('' + item.path).default)
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

