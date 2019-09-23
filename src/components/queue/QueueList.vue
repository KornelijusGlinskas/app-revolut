<template>
  <div class="py-4 md:py-8">
    <button
      class="btn btn--blue w-full mb-4 md:w-2/5"
      @click="loadClients"
      v-if="!clients.length"
    >Load clients list</button>

    <transition name="slide-fade">
      <div v-if="clients.length" class="queue__lightboard">
        <div class="queue__tags w-full flex items-center px-1 py-2 text-grey md:px-4">
          <div class="w-1/5">Unique Number</div>
          <div class="w-1/5">Name</div>
          <div class="w-1/5">Specialist</div>
          <div class="w-1/5">Scheduled time</div>
          <div class="w-1/5">Left to wait</div>
        </div>
        <queue-client v-for="client in clients" :key="client.number" :client="client"></queue-client>
      </div>
    </transition>
    <div v-if="!clients.length">
      <p
        class="font-bold"
      >All clients sessions are over. 😢 Add new ones in Admin Page or load with the button at the top! 👨🏼‍💻</p>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns';
import queueClient from './Client';

export default {
  components: {
    queueClient
  },
  methods: {
    loadClients() {
      this.$http
        .get('/data/clients.json')
        .then(result => {
          // get clients data from json response result
          const clients = result.data;

          // Loop through clients in order to assign client to specialist
          clients.forEach(client => {
            this.$store.dispatch('assignClient', client);
          });

          // verificate ajax call
          this.$store.dispatch('showAlert', {
            message: 'The data was loaded! 👨🏼‍💻'
          });
        })
        .catch(error => {
          // if ajax file read fails, show alert
          this.$store.dispatch('showAlert', {
            type: 'error',
            message: 'Sorry, could not retrieve clients data. 😭'
          });
        });
    }
  },

  computed: {
    specialists() {
      return this.$store.getters.specialists;
    },
    clients() {
      return this.$store.getters.clients;
    }
  }
};
</script>
