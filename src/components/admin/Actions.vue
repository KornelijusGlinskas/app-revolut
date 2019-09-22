<template>
  <div class="admin__actions w-full p-8 mt-16 lg:w-3/5 text-left">
    <h2 class="font-bold text-xl text-left mb-4 md:mb-8 md:text-3xl">Actions</h2>
    <div class="info flex items-center mb-2">
      <span class="icon-info mr-2 text-blue"></span>
      <p class="text-grey text-xs md:text-base">Save queue data into local storage</p>
    </div>
    <button @click="saveLocal" class="btn btn--blue btn--full">Save Data</button>
    <div class="info flex items-center mt-4 mb-2">
      <span class="icon-info mr-2 text-blue"></span>
      <p class="text-grey text-xs md:text-base">Remove queue data from local storage</p>
    </div>
    <button @click="removeLocal" class="btn btn--blue btn--full">Remove Data</button>
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
    },
    tickets() {
      return this.$store.getters.tickets;
    }
  },

  methods: {
    // Save specialists and clients to local storage
    saveLocal() {
      window.localStorage.setItem(
        'specialists',
        JSON.stringify(this.specialists)
      );
      window.localStorage.setItem('clients', JSON.stringify(this.clients));
      window.localStorage.setItem('tickets', this.tickets);
      // Show success alert
      this.$store.dispatch('showAlert', {
        message: 'The data was saved! 💻'
      });
    },
    // Remove local storage
    removeLocal() {
      window.localStorage.removeItem('specialists');
      window.localStorage.removeItem('specialists');
      this.$store.dispatch('showAlert', { message: 'The data was removed! 🗑' });
    }
  }
};
</script>