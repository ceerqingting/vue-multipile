import store from '@/store/modules/product/index';
import { axios, getJsonp } from '@/resource/index';
import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import router from './router';

require('@/main');

Vue.prototype.$axios = axios;
Vue.prototype.$jsonp = getJsonp;


sync(store, router);

const app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(require('./app')),
});
