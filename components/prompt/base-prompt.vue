<template>
  <v-card>
    <v-card-title class="blockquote">
      <slot name="content"></slot>
    </v-card-title>
    <slot v-if="isReviewer" name="reviewer"></slot>
    <slot name="posts"></slot>
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