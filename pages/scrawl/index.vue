<template>
  <v-flex>
    <v-layout>
      <v-flex>
        <NewPrompt />
      </v-flex>
    </v-layout>
    <v-layout>
      <PromptList />
    </v-layout>
  </v-flex>
</template>

<script>
import PromptList from '@/components/public/prompt-list'
import NewPrompt from '@/components/contribute/new-prompt'
export default {
  components: {
    PromptList,
    NewPrompt,
  },
}
</script>