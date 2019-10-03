<template>
  <v-flex>
    <v-layout align-center>
      <v-flex shrink>
        <h1>Welcome to the Stall</h1>
      </v-flex>
      <v-flex>
        <blockquote class="blockquote">
          Do you want to <nuxt-link to="/scrawl">scrawl</nuxt-link> on the Wall?
        </blockquote>
      </v-flex>
    </v-layout>
    <v-layout>
      <PromptList :prompts="$store.getters['prompt/approved/byDate']" />
    </v-layout>
  </v-flex>
</template>

<script>
import { mapState } from 'vuex';
import PromptList from '@/components/public/prompt-list'
export default {
  auth: false,
  components: {
    PromptList,
  },
}
</script>