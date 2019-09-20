import Vue from 'vue';
import Router from 'vue-router';

import Queue from './views/Queue.vue';
import Specialist from './views/Specialist.vue';
import Admin from './views/Admin.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'queue',
      component: Queue
    },
    {
      path: '/specialist',
      name: 'specialist',
      component: Specialist
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    }
  ]
});
