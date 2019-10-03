<template>
  <v-card class="transparent">
    <v-card-text>
      <nuxt-link :to="`/scrawl/${id}`">
        {{content}}
      </nuxt-link>
    </v-card-text>
    <v-card-actions v-if="isReviewer">
      <slot name="reviewer-actions"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    id: String,
    date_created: String,
    created_by: String,
    content: String,
    status: String,
  },
  computed: {
    isReviewer() {
      return this.$store.getters['auth/permission'].includes('reviewer');
    }
  }
}
</script>