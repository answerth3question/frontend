<template>
  <v-flex>
    <!-- <v-tabs color="transparent">
      <v-tab nuxt to="/review/prompts/pending">Pending</v-tab>
      <v-tab nuxt to="/review/prompts/approved">Approved</v-tab>
      <v-tab nuxt to="/review/prompts/rejected">Rejected</v-tab>
    </v-tabs> -->
    <nuxt-child></nuxt-child>
  </v-flex>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    console.log('hi')
    if (!to.params.status) {
      console.log('hello')
      next('/review/prompts/pending')
    }
    console.log('goodby')
    next()
  }
}
</script>