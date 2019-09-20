<template>
  <div class="status w-full flex flex-auto flex-col justify-between py-4 md:flex-row">
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
</template>