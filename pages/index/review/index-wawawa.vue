<template>
  <v-flex>
    <v-layout>
      <v-flex>
        Review posts submitted by contributers
        <v-select v-model="status" :items="options"></v-select>
      </v-flex>
    </v-layout>
    <v-layout>
      <prompt-list :prompts="prompts">
        <template v-slot:prompt="prompt">
          <ReviewerPrompt v-bind="prompt" />
        </template>
      </prompt-list>
    </v-layout>
  </v-flex>
</template>

<script>
import PromptList from '@/components/public/prompt-list'
import ReviewerPrompt from '@/components/prompt/reviewer-prompt'
export default {
  components: {
    PromptList,
    ReviewerPrompt,
  },
  data() {
    return {
      status: 'pending',
      options: [
        'pending',
        'approved',
        'rejected',
      ],
    }
  },
  computed: {
    prompts() {
      return this.$store.getters[`prompt/${this.status}/itemsByDate`];
    }
  },
  methods: {
    approve(id) {
      console.log(id)
    },

  }
}
</script>