<template>
  <transition name="slide-fade">
    <div
      v-if="alert"
      class="alert"
      :class="alert.type === 'error' ? 'alert--error' : 'alert--success'"
    >{{ alert.message }}</div>
  </transition>
</template>

<script>
export default {
  computed: {
    alert() {
      return this.$store.getters.alert;
    }
  }
};
</script>