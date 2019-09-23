import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import axios from 'axios';

import dateMixin from './mixins/dateMixin';
import Alert from '@/components/TheAlert.vue';

Vue.config.productionTip = false;

axios.defaults.baseURL = process.env.BASE_URL;

Vue.prototype.$http = axios;
Vue.component('app-alert', Alert);

Vue.mixin(dateMixin);

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    if (sessionStorage.redirect) {
      const redirect = sessionStorage.redirect;
      delete sessionStorage.redirect;
      this.$router.push(redirect);
    }
  }
}).$mount('#app');
