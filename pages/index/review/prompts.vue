<template>
  <v-flex>
    <v-tabs color="transparent">
      <v-tab nuxt to="/review/prompts/pending">Pending</v-tab>
      <v-tab nuxt to="/review/prompts/approved">Approved</v-tab>
      <v-tab nuxt to="/review/prompts/rejected">Rejected</v-tab>
    </v-tabs>
    <nuxt-child></nuxt-child>
  </v-flex>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    if (!to.params.status) {
      next('/review/prompts/pending')
    }
    next()
  }
}
</script>