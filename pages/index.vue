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
      {{id}}
    </v-flex>
  </v-layout>
</template>

<script>
import jwt from 'jsonwebtoken'
export default {
  computed: {
    id() {
      const user = this.$store.state.auth.user;
      if (user) {
        return jwt.decode(this.$store.state.auth.user.id_token);
      }
      return '';
    }
  }
}
</script>

