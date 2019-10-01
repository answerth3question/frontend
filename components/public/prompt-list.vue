<template>
  <v-flex>
    <v-container grid-list-md>
      <v-layout wrap justify-left>
        <template v-for="prompt in prompts">
          <v-flex :key="prompt.id" xs12 sm6 md4 d-flex>
            <Prompt v-bind="prompt" />
          </v-flex>
        </template>
      </v-layout>
    </v-container>
    <!-- <template v-for="prompt in prompts">
      <Prompt :key="prompt.id" v-bind="prompt" />
    </template> -->
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