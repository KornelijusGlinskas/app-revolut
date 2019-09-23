<template>
  <div class="user">
    <h1 class="font-bold text-3xl mb-8 md:text-5xl md:mb-16">User Panel</h1>
    <specialist-queue />
  </div>
</template>

<script>
import SpecialistQueue from '@/components/user/User.vue';

export default {
  name: 'specialist',
  components: {
    SpecialistQueue
  }
};
</script>
