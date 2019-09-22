<template>
  <div class="admin flex flex-col items-center">
    <h1 class="font-bold text-3xl mb-8 md:text-5xl md:mb-16">Admin Panel</h1>
    <register />
    <actions />
  </div>
</template>

<script>
import Actions from '@/components/admin/Actions.vue';
import Register from '@/components/admin/Register.vue';

export default {
  name: 'admin',
  components: {
    Actions,
    Register
  }
};
</script>

<style scoped lang="scss">
.admin__actions,
.admin__register {
  @include box;
}
</style>