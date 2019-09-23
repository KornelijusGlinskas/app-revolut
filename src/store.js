import Vue from 'vue';
import Vuex from 'vuex';

import { differenceInSeconds } from 'date-fns';
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
    // update specialist clients queue timer
    UPDATE_SPECIALIST_TIMER(state, client) {
      const index = state.specialists.findIndex(
        specialist => specialist.name === client.specialist
      );
      const specialist = state.specialists[index];
      specialist.queueTime -= specialist.avgTime;
    },
    // recalculate clients exp time
    RECALCULATE_CLIENTS_TIMER(state, index) {
      // get specialist
      const specialist = state.specialists[index];

      // reset queue time
      specialist.queueTime = 0;

      // loop through specialists client and assign new times
      state.clients.forEach(client => {
        if (client.specialist === specialist.name) {
          client.expTime = dateMethods.addTime(
            client.regTime,
            specialist.queueTime
          );
        }
        specialist.queueTime += specialist.avgTime;
      });
    },
    // assign client to the specialist
    ASSIGN_CLIENT(state, client) {
      // find selected specialist
      const index = state.specialists.findIndex(
        specialist => specialist.name === client.specialist
      );
      const specialist = state.specialists[index];

      // get current time timestamp
      const curTime = dateMethods.getCurrentTime();

      // create person object
      const person = {
        number: state.ticketNum++,
        name: client.name,
        specialist: client.specialist,
        regTime: curTime,
        expTime: dateMethods.addTime(curTime, specialist.queueTime),
        sessionTime: specialist.avgTime,
        timeLeft: '',
        status: ''
      };

      // add client's time to specialist queue
      specialist.queueTime += specialist.avgTime;

      // save person
      state.clients.push(person);
      specialist.clients.push(person);
    },
    // set timer every second for the client
    QUEUE_TIMER(state, clientNum) {
      const index = state.clients.findIndex(c => c.number === clientNum);
      const client = state.clients[index];

      let timer = () => {
        const timeData = dateMethods.waitTime(client);
        if (timeData == null) {
          // clear timer
          clearInterval(timer);

          // update client details and get session time if ended earlier
          client.timeLeft = '';
          const sessionTime = differenceInSeconds(
            dateMethods.getCurrentTime(),
            client.expTime
          );
          client.sessionTime = sessionTime > 0 ? sessionTime : 0;

          // push client to the bottom
          state.clients.push(
            state.clients.splice(state.clients.indexOf(client), 1)[0]
          );

          // update client's timer
          this.commit('UPDATE_SPECIALIST_TIMER', client);
        } else {
          client.status = timeData.status;
          client.timeLeft = timeData.left;
        }
      };
      // init timer every second
      timer();
      timer = setInterval(timer, 1000);
    },
    // update client
    UPDATE_CLIENT(state, client) {
      const index = state.clients.findIndex(c => c.number === client.number);
      state.clients[index].timeLeft = client.timeLeft;
    },
    // set client status to done
    SET_TO_DONE(state, index) {
      state.clients[index].status = 'done';
    },
    SWITCH_CLIENTS(state, clients) {
      // get clients indexes
      const aIndex = state.clients.indexOf(clients.A);
      const bIndex = state.clients.indexOf(clients.B);

      // get clients on store
      const clientA = state.clients[aIndex];
      const clientB = state.clients[bIndex];

      // save data for switching
      const expTimeA = clientA.expTime;

      // switch clients
      clientA.expTime = clientB.expTime;
      clientB.expTime = expTimeA;

      // swap positions in array
      const temp = clientA;
      state.clients[aIndex] = clientB;
      state.clients[bIndex] = temp;
    },
    CANCEL_CLIENT(state, index) {
      // deduct avg time from specialist queue time
      const specialistIndex = state.specialists.findIndex(
        specialist => specialist.name === state.clients[index].specialist
      );
      const specialist = state.specialists[specialistIndex];
      specialist.queueTime -= specialist.avgTime;

      // remove from array
      state.clients.splice(index, 1);

      // update new times
      this.commit('RECALCULATE_CLIENTS_TIMER', specialistIndex);
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
    updateClient: ({ commit }, client) => {
      commit('UPDATE_CLIENT', client);
    },
    setToDone: ({ commit, state }, index) => {
      commit('SET_TO_DONE', index);
    },
    switchClients: ({ commit }, clients) => {
      commit('SWITCH_CLIENTS', clients);
    },
    cancelClient({ commit }, index) {
      commit('CANCEL_CLIENT', index);
    }
  },

  getters: {
    specialists: state => state.specialists,
    clients: state => {
      return state.clients.sort((a, b) => {
        if (a.specialist > b.specialist) {
          return 1;
        } else if (b.specialist > a.specialist) {
          return -1;
        }
        return 0;
      });
    },
    alert: state => state.alert,
    tickets: state => state.ticketNum
  }
});
