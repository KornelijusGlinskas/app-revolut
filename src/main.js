import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// import './assets/css/tailwind.css';
// import './assets/css/icons.css';

// import './assets/styles/style.scss';s

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
