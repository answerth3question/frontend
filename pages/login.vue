<template>
  <v-layout>
    <v-flex>
      <v-btn @click="$auth.loginWith('google')">Sign in with Google</v-btn>
      <nuxt-link to="/">Home</nuxt-link>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  methods: {
    async googleLogin() {
      await this.$auth.loginWith('google');
      console.log('done with login')
    }
  },
}
</script>
