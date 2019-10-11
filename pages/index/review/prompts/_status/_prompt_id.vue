<template>
  <v-flex>
    <v-card>
      <v-card-title class="title">
        {{prompt.content}}
        <v-spacer></v-spacer>
        <span class="caption">
          {{prompt.displayDate}}
        </span>
      </v-card-title>
      <v-card-text>
        <v-layout v-for="review in prompt.reviews" :key="review.id">
          
        </v-layout>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  computed: {
    prompt() {
      return this.$store.getters['prompt/selected'];
    }
  }
}
</script>