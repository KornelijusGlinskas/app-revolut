<template>
  <div class="queue py-4 md:py-8">
    <button
      class="btn btn--blue w-full mb-4 md:w-2/5"
      @click="loadClients"
      v-if="!clients.length"
    >Load clients list</button>

    <div
      class="queue__tags w-full flex items-center px-1 py-2 text-grey md:px-4"
      v-if="clients.length"
    >
      <div class="w-1/5">Unique Number</div>
      <div class="w-1/5">Name</div>
      <div class="w-1/5">Specialist</div>
      <div class="w-1/5">Expected time</div>
      <div class="w-1/5">Left to wait</div>
    </div>

    <div
      v-for="client in clients"
      :key="client.number"
      class="queue__person relative w-full flex items-center rounded shadow-lg font-bold px-1 py-3 mb-4 md:p-4"
    >
      <div class="person__number w-1/5">#{{ client.number}}</div>
      <div class="person__name w-1/5">{{ client.name }}</div>
      <div class="person__specialist w-1/5">{{ client.specialist }}</div>
      <div class="person__expected-time w-1/5">14.22</div>
      <div class="person__wait-time w-1/5">{{ client. time}}</div>
      <div class="person__status-circle circle circle--pending"></div>
    </div>
  </div>
</template>

<script>
export default {
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
            this.$store.dispatch('sortClients');
          });
        })
        .catch(error => {
          alert('Sorry, Could not retrieve clients data');
          console.log(error);
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