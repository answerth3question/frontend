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
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex';
export default {
  auth: false,
  layout(ctx) {
    return ctx.app.$auth.loggedIn() ? 'authenticated' : '';
  },
  computed: {
    ...mapState('posts', [
      'posts',
    ]),
  }
}
</script>