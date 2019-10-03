<template>
  <v-flex>
    <v-layout>
      <v-flex>
        <NewPrompt />
      </v-flex>
    </v-layout>
    <v-layout>
      <blockquote class="blockquote">More content...(?)</blockquote>
    </v-layout>
  </v-flex>
</template>

<script>
import NewPrompt from '@/components/contribute/new-prompt'
export default {
  components: {
    NewPrompt,
  },
}
</script>
