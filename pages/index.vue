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
      <p v-for="post in $store.state.posts.posts.map(p => p.content)" :key="post.id">{{post.text}}</p>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex';
export default {
  auth: false,
  layout(ctx) {
    return ctx.app.$auth.loggedIn() ? 'authenticated' : ''
  },
  async fetch({ store, $axios }) {
    try {
      const getPostResult = await $axios.$get('/api/post/')
      store.commit('posts/SET', ['posts', getPostResult.posts]);
    } catch (error) {
      const errorPayload = [...store.state.posts.errors, error.message]; 
      store.commit('posts/SET', ['errors', errorPayload]);
    }
  },
  computed: {
    ...mapState('posts', [
      'posts',
    ]),
  }
}
</script>