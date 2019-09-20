<template>
  <div id="app">
    <app-sidebar></app-sidebar>
    <router-view class="page-content p-4 md:p-8" />
  </div>
</template>

<script>
import appSidebar from '@/components/TheSidebar.vue';

export default {
  name: 'App',

  components: {
    appSidebar
  },

  created() {
    this.$store.dispatch('initSpecialists'); // Init specialists data from .js file
  },

  mounted() {
    const storage = window.localStorage;
    // if local storage data exists, fetch it
    if (storage.getItem('specialists') && storage.getItem('clients')) {
      this.$store.dispatch('fetchData');
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.page-content {
  margin-left: calc(100% / 6);
  min-height: 100vh;

  @include breakpoint(m) {
    margin-left: 25%;
  }
}
</style>
