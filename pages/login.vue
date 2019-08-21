<template>
  <v-layout>
    <v-flex>
      <v-btn @click="$auth.login('google')">Sign in with Google</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  auth: false
}
</script>