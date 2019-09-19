<template>
  <div class="home">
    <div class="status w-full flex flex-autoflex-col justify-between py-4 md:flex-row">
      <div class="status__done flex">
        <div class="circle circle--done"></div>
        <p class="font-bold ml-4 text-xs md:text-base">Done</p>
      </div>
      <div class="status__pending flex mt-2 md:mt-0">
        <div class="circle circle--pending"></div>
        <p class="font-bold ml-4 text-xs md:text-base">Pending</p>
      </div>
      <div class="status__ongoing flex mt-2 md:mt-0">
        <div class="circle circle--ongoing"></div>
        <p class="font-bold ml-4 text-xs md:text-base">Ongoing</p>
      </div>
    </div>
    <div class="queue py-4 md:py-8">
      <div class="queue__tags w-full flex items-center px-1 py-2 text-grey md:px-4">
        <div class="w-1/5">Unique Number</div>
        <div class="w-1/5">Name</div>
        <div class="w-1/5">Specialist</div>
        <div class="w-1/5">Expected time</div>
        <div class="w-1/5">Left to wait</div>
      </div>
      <div
        class="queue__person relative w-full flex items-center rounded shadow-lg font-bold px-1 py-3 mb-4 md:p-4"
      >
        <div class="person__number w-1/5">#104</div>
        <div class="person__name w-1/5">K. Glinskas</div>
        <div class="person__specialist w-1/5">B. Gates</div>
        <div class="person__expected-time w-1/5">14.22</div>
        <div class="person__wait-time w-1/5">1min 2sec</div>
        <div class="person__status-circle circle circle--pending"></div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {}
};
</script>


<style lang="scss">
.queue__person {
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
}
.queue__person,
.queue__tags {
  font-size: 0.5rem;
  @include breakpoint(m) {
    font-size: 1rem;
  }
}

.person__status-circle {
  position: absolute;
  top: calc(#{$diam} / -2);
  right: calc(#{$diam} / -2);
}
</style>