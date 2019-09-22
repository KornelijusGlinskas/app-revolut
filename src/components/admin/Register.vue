 <template>
  <div class="admin__register w-full p-8 lg:w-3/5 text-left">
    <h2 class="font-bold text-xl text-left mb-4 md:mb-8 md:text-3xl">Register in queue</h2>
    <div class="info flex items-center mb-2">
      <span class="icon-info mr-2 text-blue"></span>
      <p class="text-grey text-xs md:text-base">Fill the data to register new person</p>
    </div>
    <form>
      <input v-model="name" ref="nameInput" type="text" class="input" placeholder="Name" />
      <select v-model="specialist" class="mt-4">
        <option value disabled selected>Select specialist</option>
        <option v-for="specialist in specialists" :key="specialist.name">{{ specialist.name }}</option>
      </select>
      <button @click.prevent="registerClient" class="btn btn--blue btn--full mt-8">Register</button>
      <div v-if="specialist" class="register__expected-time mt-4 text-sm flex items-center">
        <span class="icon-clock mr-2 text-base text-red"></span>
        <p
          class="text-grey"
        >Expected wait time for the specialist: {{ expectedTime(specialist) }} seconds</p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      specialist: ''
    };
  },

  computed: {
    specialists() {
      return this.$store.getters.specialists;
    }
  },

  methods: {
    registerClient() {
      // register new  client by sending filled data
      this.$store.dispatch('assignClient', {
        name: this.name,
        specialist: this.specialist
      });

      // verificate that register went succesfully with alert
      this.$store.dispatch('showAlert', {
        message: `${this.name} was successfully registered! 🎉`
      });

      // clear fields
      this.name = '';
      this.specialist = '';

      // set focus once again
      this.$refs.nameInput.focus();
    },

    expectedTime(name) {
      const index = this.specialists.findIndex(
        specialist => specialist.name === name
      );
      return this.$store.getters.specialists[index].avgTime;
    }
  },

  mounted() {
    // set focus on input field
    this.$refs.nameInput.focus();
  }
};
</script>
