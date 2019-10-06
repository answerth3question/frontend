<template>
  <v-flex>
    <h1>Review {{$route.params.status}} prompts</h1>
    <template v-for="prompt in prompts" >
      <v-layout :key="prompt.id">
        <v-flex>
          <!-- <ReviewerPrompt  v-bind="prompt" /> -->
          <nuxt-link :to="`/review/prompts/${status}/${prompt.id}`">{{prompt.content}}</nuxt-link>
        </v-flex>
      </v-layout>
    </template>
  </v-flex>
</template>

<script>
import PromptList from '@/components/public/prompt-list'
import ReviewerPrompt from '@/components/prompt/reviewer-prompt'
export default {
  validate({ params }) {
    return ['approved', 'pending', 'rejected'].includes(params.status);
  },
  components: {
    ReviewerPrompt,
  },
  computed: {
    status() {
      return this.$route.params.status;
    },
    prompts() {
      return this.$store.getters[`prompt/${this.status}/itemsByDate`];
    },
  },
}
</script>