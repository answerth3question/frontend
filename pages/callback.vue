<template>
  <v-layout>
    <v-flex>
      Logging in...
    </v-flex>
  </v-layout>
</template>

<script>
import { googleAuth } from '../middleware/auth/google'
export default {
  mounted() {
    googleAuth.handleCallback({ route: this.$route, $axios: this.$axios, store: this.$store })
  }
}
</script>
