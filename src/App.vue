<template>
  <div id="app">
    <app-sidebar></app-sidebar>
    <transition name="slide-fade" mode="out-in">
      <router-view class="page-content p-4 md:p-8" />
    </transition>
    <app-alert></app-alert>
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
    // if local storage data exists, fetch it
    const storage = window.localStorage;
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
