<template>
  <div class="queue">
    <button @click="fullScreen" class="toggle-btn shadow-lg hidden md:flex">
      <span :class="isFullscreen ? 'icon-shrink' : 'icon-expand' "></span>
    </button>
    <status />
    <queue-list />
  </div>
</template>

<script>
import Status from '@/components/queue/Status.vue';
import QueueList from '@/components/queue/QueueList.vue';

export default {
  name: 'queue',

  data() {
    return {
      isFullscreen: false
    };
  },

  components: {
    Status,
    QueueList
  },

  methods: {
    // toggle fullscreen on button click
    fullScreen() {
      this.isFullscreen = !this.isFullscreen;
      if (this.isFullscreen) this.$el.requestFullscreen();
      else document.exitFullscreen();
    }
  }
};
</script>


<style lang="scss">
// set queue 100 viewport width in order to disable scrolling
.queue {
  position: relative;
  height: 100vh;
  overflow: hidden;

  // Make fullscreen background white
  &:fullscreen {
    background-color: white;
  }
}

.queue__person {
  @include box;
}
.queue__person,
.queue__tags {
  font-size: 0.5rem;
  @include breakpoint(m) {
    font-size: 1rem;
  }
}
</style>