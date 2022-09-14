// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import axios from '@/api/axios';
import qs from 'qs'
import VueCookie from 'js-cookie'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'

Vue.use(ElementUI, VueCookie)
Vue.prototype.$qs = qs;
Vue.prototype.$http = axios;
Vue.prototype.$cookie = VueCookie
Vue.config.productionTip = false

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
