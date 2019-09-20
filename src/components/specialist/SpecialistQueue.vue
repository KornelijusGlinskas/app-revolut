<template>
  <div>
    <div class="specialist__search w-full md:flex md:justify-between">
      <div class="search__specialist w-full md:w-2/5 md:mr-4">
        <select>
          <option value disabled selected>Select specialist</option>
          <option v-for="specialist in specialists" :key="specialist.name">{{ specialist.name }}</option>
        </select>
      </div>
      <div class="search__name w-full mt-4 md:w-3/5 md:mt-0">
        <input type="text" class="input" placeholder="Search by client's name..." />
      </div>
    </div>
    <div class="specialist__queue w-full mt-8">
      <h2 class="font-bold text-xl text-left md:text-3xl">Clients queue</h2>
      <div class="info flex items-center mb-2">
        <span class="icon-info mr-2 text-green"></span>
        <p
          class="text-grey text-xs md:text-base"
        >Press green box with tick in order to mark it as done</p>
      </div>

      <div class="queue__list w-full flex flex-wrap -mx-4">
        <div v-for="client in clients" :key="client.number" class="w-full p-4 md:w-1/2 lg:w-1/3">
          <div class="list__item p-4">
            <p class="list__number text-grey">
              Unique Number:
              <strong>#104</strong>
            </p>
            <p class="list__number mt-2 text-grey">
              Client name:
              <strong>K. Glinskas</strong>
            </p>
            <p class="list__number mt-2 text-grey">
              Selected Specialist:
              <strong>B. Gates</strong>
            </p>
            <p class="list__number mt-2 text-grey">
              Scheduled Time:
              <strong>14:44</strong>
            </p>
            <a href="#" class="btn btn--green mt-4">
              <span class="icon-checkmark text-white mr-2"></span>
              Mark As Done
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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