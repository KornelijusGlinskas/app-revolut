<template>
  <div
    id="nav"
    class="w-1/6 fixed h-full flex flex-col justify-between bg-black text-white text-left md:w-1/4"
  >
    <div class="nav__logo p-4 md:p-8 flex justify-center">
      <img
        class="logo__desktop hidden md:block"
        src="../assets/images/revolut-logo.svg"
        alt="light blue revolut logo"
      />
      <img
        class="logo__mobile block md:hidden"
        src="../assets/images/revolut-logo-r-letter.svg"
        alt="light blue revolut logo R letter"
      />
    </div>
    <nav class="nav__items w-full">
      <ul>
        <router-link to="/" tag="li" class="nav__item">
          <a class="item__link">
            <span class="icon-clock item__icon"></span>
            <span class="item__text hidden md:block">Queue Line</span>
          </a>
        </router-link>

        <router-link to="/specialist" tag="li" class="nav__item">
          <a class="item__link">
            <span class="icon-user item__icon"></span>

            <span class="item__text hidden md:block">Specialist Page</span>
          </a>
        </router-link>

        <router-link to="/admin" tag="li" class="nav__item">
          <a class="item__link">
            <span class="icon-settings item__icon"></span>
            <span class="item__text hidden md:block">Admin Page</span>
          </a>
        </router-link>
      </ul>
    </nav>
    <div class="nav__copyright p-8 text-sm">
      <p class="hidden md:block">2019 © all rights reserved</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.nav__item {
  opacity: 0.6;
  transition: all 0.2s ease-in-out;
}

.item__link {
  @apply block px-8 py-4 flex justify-center;

  @include breakpoint(m) {
    @apply justify-start;
  }
}

.item__icon {
  @apply text-2xl;

  @include breakpoint(m) {
    @apply pr-4;
  }
}

.router-link-exact-active,
.nav__item:hover {
  opacity: 1;
  background: rgb(41, 144, 205);
  background: linear-gradient(
    90deg,
    rgba(41, 144, 205, 1) 0%,
    rgba(32, 32, 33, 1) 100%
  );
}
</style>