<template>
  <v-card>
    <v-card-title>
      <slot name="status"></slot>
      <v-spacer></v-spacer>
      {{displayDate}}
    </v-card-title>
    <v-card-text>
      <blockquote class="blockquote">
        <v-slot name="content"></v-slot>
      </blockquote>
      <v-layout>
        <slot name="responses"></slot>
      </v-layout>
    </v-card-text>
    <v-card-actions v-if="isReviewer">

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
    posts: {
      type: Array,
      default: () => [],
    },
    reviews: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    displayDate() {
      return new Date(this.date_created).toLocaleString();
    },
    isReviewer() {
      return this.$store.getters['auth/permission'].includes('reviewer');
    }
  }
}
</script>