import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';

axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

Vue.prototype.$http = axios.create({
  baseURL: 'http://127.0.0.1'
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
