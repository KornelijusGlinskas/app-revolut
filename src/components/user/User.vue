<template>
  <div>
    <div class="user__search w-full md:flex md:justify-between">
      <div class="search__number w-full">
        <div class="search__name w-full mt-4 md:mt-0">
          <div class="info flex items-center mb-2">
            <span class="icon-info mr-2 text-green"></span>
            <p
              class="text-grey text-left text-xs md:text-base"
            >Enter the client's number or select from the list:</p>
          </div>
          <input
            v-model="numberQuery"
            list="clients-numbers"
            type="text"
            class="input"
            placeholder="Search by client's number... (ex: #1)"
          />
          <datalist id="clients-numbers">
            <option
              v-for="client in clients"
              :key="client.number"
            >{{client.number}} ({{client.name}})</option>
          </datalist>
        </div>
      </div>
    </div>

    <transition name="slide-in" mode="out-in">
      <p
        v-if="!client && numberQuery !== ''"
        class="mt-8"
      >The client with number ({{ numberQuery }}) doesn't exist</p>
      <div v-if="client" class="user__info w-full mt-8">
        <div class="list__item relative p-8">
          <h2 class="text-3xl">
            <strong>{{ client.name }}</strong>
            #{{ client.number }}
          </h2>
          <h3 v-if="client.status === 'pending'" class="list__time mb-4 text-xl">
            Time Left:
            <span class="font-bold text-blue">{{ client.timeLeft }}</span>
          </h3>

          <p class="list__number mt-2 text-grey">
            Specialist:
            <strong>{{ client.specialist }}</strong>
          </p>
          <p class="list__number mt-2 text-grey">
            Registered Time:
            <strong>{{ formatDate(client.regTime, 'p') }}</strong>
          </p>
          <p class="list__number mt-2 text-grey">
            Scheduled Time:
            <strong>{{ formatDate(client.expTime, 'p') }}</strong>
          </p>
          <p class="list__number mt-2 text-grey">
            Session Time:
            <strong>{{ client.sessionTime }} seconds</strong>
          </p>
          <p class="list__number mt-2 text-grey">
            Status:
            <strong>{{ client.status }}</strong>
          </p>
          <div class="list__actions mt-8 block md:flex">
            <button
              @click="delayMeeting(client)"
              class="btn btn--orange btn--half mb-2 md:mb-0 md:mr-2"
            >Delay meeting</button>
            <button
              @click="cancelMeeting(client)"
              class="btn btn--red btn--half mr-2"
            >Cancel meeting</button>
          </div>
          <div class="person__status-circle circle" :class="`circle--${client.status}`"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numberQuery: ''
    };
  },

  methods: {
    delayMeeting(client) {
      if (this.validateClient(client)) {
        // get new array of clients only with specific specialist and status pending
        const clients = this.clients.filter(
          c => c.specialist === client.specialist && c.status === 'pending'
        );

        const index = clients.indexOf(client);

        if (this.isLast(client.name, index, clients.length - 1)) {
          this.$store.dispatch('switchClients', {
            A: clients[index],
            B: clients[index + 1]
          });
        }
      }
    },
    cancelMeeting(client) {
      if (this.validateClient(client)) {
        // remove from array and show notification
        this.$store.dispatch('showAlert', {
          message: `${client.name} is removed from queue!`
        });
        this.$store.dispatch('cancelClient', this.clients.indexOf(client));
        // clear search field
        this.numberQuery = '';
      }
    },
    validateClient(client) {
      // if status done or ongoing, show alert and return false
      if (client.status === 'done' || client.status === 'ongoing') {
        this.$store.dispatch('showAlert', {
          message: `${client.name}'s session is ${client.status}`,
          type: 'error'
        });
        return false;
      } else {
        return true;
      }
    },
    isLast(name, clientIndex, lastIndex) {
      console.log(lastIndex, clientIndex);
      if (clientIndex === lastIndex) {
        this.$store.dispatch('showAlert', {
          message: `${name} is the last client`,
          type: 'error'
        });
        return false;
      } else {
        return true;
      }
    }
  },

  computed: {
    specialists() {
      return this.$store.getters.specialists;
    },
    clients() {
      return this.$store.getters.clients;
    },
    client() {
      const index = this.clients.findIndex(
        client => client.number === parseInt(this.numberQuery)
      );
      if (this.clients[index]) return this.clients[index];
      return null;
    }
  }
};
</script>
<style scoped lang="scss">
.queue__list {
  strong {
    color: $black;
    font-weight: bold;
  }
  & > div p {
    text-align: left;
  }
}

.list__item {
  @include box;
}
</style>