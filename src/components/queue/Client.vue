<template>
  <div
    class="queue__person relative w-full flex items-center rounded shadow-lg font-bold px-1 py-3 mb-4 md:p-4"
    v-if="!isDone(client)"
  >
    <div class="person__number w-1/5">#{{ client.number}}</div>
    <div class="person__name w-1/5">{{ client.name }}</div>
    <div class="person__specialist w-1/5">{{ client.specialist }}</div>
    <div class="person__scheduled-time w-1/5">{{ formatDate(client.expTime, 'p') }}</div>
    <div class="person__wait-time w-1/5">{{ client.timeLeft }}</div>
    <div class="person__status-circle circle" :class="`circle--${client.status}`"></div>
  </div>
</template>

<script>
export default {
  props: ['client'],
  methods: {
    isDone(client) {
      return client.status === 'done' ? true : false;
    }
  }
};
</script>