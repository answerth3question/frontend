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
      <prompt-list :prompts="$store.getters['prompt/approved/itemsByDate']">
        <template v-slot:prompt="item">
          {{item.content}}
        </template>
      </prompt-list>
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