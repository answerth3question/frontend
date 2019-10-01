<template>
  <v-flex>
    <template v-for="prompt in prompts">
      <Prompt :key="prompt.id" v-bind="prompt" />
    </template>
  </v-flex>
</template>

<script>
import Prompt from '@/components/public/prompt'
export default {
  components: {
    Prompt,
  },
  computed: {
    prompts() {
      return this.$store.getters['prompt/pending/byDate'];
    }
  }
}
</script>