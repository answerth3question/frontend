<template>
  <v-flex>
    <v-layout>
      <h3>Prompts</h3>
    </v-layout>
    <v-layout>
      <PromptList />
    </v-layout>
  </v-flex>
</template>

<script>
import PromptList from '@/components/public/prompt-list'
export default {
  components: {
    PromptList,
  },
}
</script>