<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      This is the home page
      <v-btn @click="onLogout">Logout</v-btn>
      <nuxt-link to="/some-other-page">Some other page</nuxt-link>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  methods: {
    async onLogout() {
      await this.$auth.logout();
      this.$router.push('/login');
    }
  },
}
</script>

