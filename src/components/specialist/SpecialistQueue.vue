<template>
  <div>
    <div class="specialist__search w-full md:flex md:justify-between">
      <div class="search__specialist w-full md:w-2/5 md:mr-4">
        <select v-model="specQuery">
          <option value disabled selected>Select specialist</option>
          <option v-for="specialist in specialists" :key="specialist.name">{{ specialist.name }}</option>
        </select>
      </div>
      <div class="search__name w-full mt-4 md:w-3/5 md:mt-0">
        <input
          v-model="nameQuery"
          type="text"
          class="input"
          placeholder="Search by client's name..."
        />
      </div>
    </div>
    <div class="specialist__queue w-full mt-8">
      <h2 class="font-bold text-xl text-left md:text-3xl">{{ specQuery }} Clients queue</h2>
      <div class="info flex items-center mb-2">
        <span class="icon-info mr-2 text-green"></span>
        <p
          class="text-grey text-left text-xs md:text-base"
        >Press green box with tick in order to mark it as done</p>
      </div>

      <div class="queue__list w-full flex flex-wrap md:-mx-4">
        <div
          v-for="(client, index) in clients"
          :key="client.number"
          class="w-full p-4 md:w-1/2 lg:w-1/3"
        >
          <div class="list__item relative p-4">
            <p class="list__number text-grey">
              Unique Number:
              <strong>#{{ client.number }}</strong>
            </p>
            <p class="list__number mt-2 text-grey">
              Client name:
              <strong>{{ client.name }}</strong>
            </p>
            <p class="list__number mt-2 text-grey">
              Specialist:
              <strong>{{ client.specialist }}</strong>
            </p>
            <p class="list__number mt-2 text-grey">
              Scheduled Time:
              <strong>{{ formatDate(client.expTime, 'p') }}</strong>
            </p>
            <p class="list__number mt-2 text-grey">
              Status:
              <strong>{{ client.status }}</strong>
            </p>
            <button
              @click="setDone(client, index)"
              href="#"
              class="btn btn--green btn--full mt-4"
              :class="{ 'btn--disabled': isDone(client) }"
            >
              <span class="icon-checkmark text-white mr-2"></span>
              {{ isDone(client) ? '' : 'mark as done'}}
            </button>
            <div class="person__status-circle circle" :class="`circle--${client.status}`"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      specQuery: '',
      nameQuery: ''
    };
  },

  methods: {
    isDone(client) {
      return client.status === 'done' ? true : false;
    },
    setDone(client, index) {
      // if it is already done, show alert
      if (client.status === 'done') {
        this.$store.dispatch('showAlert', {
          message: `Upsy! ${client.name}'s session is over 😓`,
          type: 'error'
        });
      } else {
        this.$store.dispatch('setToDone', index);
        this.$store.dispatch('showAlert', {
          message: `${client.name}'s session is done 👏🏼`
        });
      }
    }
  },

  computed: {
    specialists() {
      return this.$store.getters.specialists;
    },
    clients() {
      return this.$store.getters.clients.filter(c => {
        if (
          c.specialist.includes(this.specQuery) &&
          c.name.toLowerCase().includes(this.nameQuery.toLowerCase())
        ) {
          return true;
        }
        return false;
      });
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