import Vue from 'vue';
import Vuex from 'vuex';

import specialists from './data/specialists';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ticketNum: 1,
    clients: [],
    specialists: [],
    currentTime: new Date().getHours()
  },

  mutations: {
    // Fetch data from local storage if available
    FETCH_DATA(state) {
      console.log('fetching');
      state.specialists = JSON.parse(
        window.localStorage.getItem('specialists')
      );
      state.clients = JSON.parse(window.localStorage.getItem('clients'));
    },
    // Set specialists
    SET_SPECIALISTS(state, specialists) {
      state.specialists = specialists;
    },
    // Assign client to the specialist
    ASSIGN_CLIENT(state, client) {
      const index = state.specialists.findIndex(
        specialist => specialist.name === client.specialist
      );
      // Create person object
      const person = {
        number: state.ticketNum++,
        name: client.name,
        specialist: client.specialist,
        time: setInterval(() => {
          return 1;
        }, 1000)
      };
      // Save object
      state.clients.push(person);
      state.specialists[index].clients.push(person);
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
    }
  },

  actions: {
    fetchData: ({ commit }) => {
      commit('FETCH_DATA');
    },
    initSpecialists: ({ commit }) => {
      commit('SET_SPECIALISTS', specialists);
    },
    assignClient: ({ commit }, client) => {
      commit('ASSIGN_CLIENT', client);
    },
    sortClients: ({ commit }) => {
      commit('SORT_CLIENTS');
    }
  },

  getters: {
    specialists: state => {
      return state.specialists;
    },
    clients: state => {
      return state.clients;
    }
  }
});
