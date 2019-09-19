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
