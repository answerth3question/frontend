<template>
  <v-flex>
    <v-container grid-list-lg fluid px-0>
      <v-layout wrap>
        <template v-for="prompt in prompts">
          <v-flex :key="prompt.id" xs12 sm6 md4>
            <slot name="prompt" v-bind="prompt"></slot>
          </v-flex>
        </template>
      </v-layout>
    </v-container>
  </v-flex>
</template>

<script>
export default {
  props: {
    prompts: {
      type: Array,
      default: () => [],
    }
  },
}
</script>