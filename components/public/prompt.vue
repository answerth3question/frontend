<template>
  <v-card flat class="transparent">
    <v-card-text >
      <nuxt-link :to="`/scrawl/${id}`">{{content}}</nuxt-link>
    </v-card-text>
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
  }
}
</script>