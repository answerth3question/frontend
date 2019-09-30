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
      <p v-for="p in prompts" :key="p.id">
        <nuxt-link :to="`/contribute/${p.id}`"> {{p.content}}</nuxt-link>
       
      </p>
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
    prompts() {
      return this.$store.state.prompt.pending;
    }
  }
}
</script>