import Vue from 'vue';
import Router from 'vue-router';

import Queue from './views/Queue.vue';
import Specialist from './views/Specialist.vue';
import Admin from './views/Admin.vue';
import User from './views/User.vue';
import Statistics from './views/Statistics.vue';

Vue.use(Router);

export default new Router({
  mode: process.env.NODE_ENV === 'production' ? 'hash' : 'history',
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
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: Statistics
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '*',
      name: '404',
      component: Queue // if url doesn't exist, forward to queue page
    }
  ]
});
