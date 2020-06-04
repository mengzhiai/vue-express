/*
 * @Date: 2020-05-21 14:05:42
 * @LastEditors: jun
 * @LastEditTime: 2020-06-04 10:44:00
 * @FilePath: \vue-express\src\main.js
 */ 
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.prototype.axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
