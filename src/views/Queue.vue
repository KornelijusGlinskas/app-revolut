<template>
  <div class="queue">
    <status />
    <queue-list />
  </div>
</template>

<script>
import Status from '@/components/queue/Status.vue';
import QueueList from '@/components/queue/QueueList.vue';

export default {
  name: 'queue',
  components: {
    Status,
    QueueList
  }
};
</script>


<style lang="scss">
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