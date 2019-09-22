import Vue from 'vue';
import Vuex, { createNamespacedHelpers } from 'vuex';

import { addSeconds, getTime } from 'date-fns';
import { methods as dateMethods } from './mixins/dateMixin';

import specialists from './data/specialists';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ticketNum: 1, // start numbering from 1
    clients: [],
    specialists: [],
    alert: null
  },

  mutations: {
    // fetch data from local storage if available
    FETCH_DATA(state) {
      state.ticketNum = JSON.parse(window.localStorage.getItem('tickets'));
      state.specialists = JSON.parse(
        window.localStorage.getItem('specialists')
      );
      state.clients = JSON.parse(window.localStorage.getItem('clients'));
      // state.clients = JSON.parse(window.localStorage.getItem('clients'));
    },
    // show alert for 2 seconds
    SHOW_ALERT(state, alert) {
      state.alert = alert;
      setTimeout(() => {
        state.alert = null;
      }, 2000);
    },
    // set specialists from .js file
    SET_SPECIALISTS(state, specialists) {
      state.specialists = specialists;
    },
    // assign client to the specialist
    ASSIGN_CLIENT(state, client) {
      // find selected specialist
      const index = state.specialists.findIndex(
        specialist => specialist.name === client.specialist
      );
      const specialist = state.specialists[index];

      // get current time timestamp
      const curTime = getTime(new Date());

      // create person object
      const person = {
        number: state.ticketNum++,
        name: client.name,
        specialist: client.specialist,
        regTime: curTime,
        expTime: dateMethods.addTime(
          curTime,
          specialist.avgTime * specialist.clients.length
        ),
        sessionTime: specialist.avgTime,
        timeLeft: '',
        status: ''
      };

      // save person
      state.clients.push(person);
      specialist.clients.push(person);
    },
    // set timer every 5 seconds for the client
    QUEUE_TIMER(state, clientNum) {
      const index = state.clients.findIndex(c => c.number === clientNum);
      const client = state.clients[index];
      let timer = () => {
        const timeData = dateMethods.waitTime(client);
        if (timeData == null) {
          clearInterval(timer);
          client.timeLeft = '';
        } else {
          client.status = timeData.status;
          client.timeLeft = timeData.left;
        }
      };
      // init timer every second
      timer();
      timer = setInterval(timer, 1000);
    },
    // sort clients by specialist name
    SORT_CLIENTS(state) {
      const clients = this.state.clients;

      clients.sort((a, b) => {
        if (a.specialist > b.specialist) {
          return 1;
        } else if (b.specialist > a.specialist) {
          return -1;
        }
        return 0;
      });
      this.state.clients = clients;
    },
    // update client
    UPDATE_CLIENT(state, client) {
      const index = state.clients.findIndex(c => c.number === client.number);
      state.clients[index].timeLeft = client.timeLeft;
    },
    // set client status to done
    SET_TO_DONE(state, index) {
      state.clients[index].status = 'done';
    }
  },

  actions: {
    fetchData: ({ commit }) => {
      commit('FETCH_DATA');
    },
    showAlert: ({ commit }, alert) => {
      commit('SHOW_ALERT', alert);
    },
    initSpecialists: ({ commit }) => {
      commit('SET_SPECIALISTS', specialists);
    },
    assignClient: ({ commit, state }, client) => {
      commit('ASSIGN_CLIENT', client);
      commit('QUEUE_TIMER', state.ticketNum - 1);
    },
    sortClients: ({ commit }) => {
      commit('SORT_CLIENTS');
    },
    updateClient: ({ commit }, client) => {
      commit('UPDATE_CLIENT', client);
    },
    setToDone({ commit }, index) {
      commit('SET_TO_DONE', index);
    }
  },

  getters: {
    specialists: state => {
      return state.specialists;
    },
    clients: state => {
      return state.clients;
    },
    alert: state => {
      return state.alert;
    },
    tickets: state => {
      return state.ticketNum;
    }
  }
});
