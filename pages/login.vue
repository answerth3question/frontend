<template>
  <v-layout>
    <v-flex>
      <v-btn @click="googleLogin">Sign in with Google</v-btn>
      <nuxt-link to="/">Home</nuxt-link>
    </v-flex>
  </v-layout>
</template>

<script>
import { googleAuth } from '../middleware/auth/google'
export default {
  methods: {
    googleLogin() {
      googleAuth.login();
    }
  },
}
</script>
