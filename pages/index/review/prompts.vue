<template>
  <v-flex>
    <v-layout>
      <nuxt-link to="/review/prompts/pending">Pending</nuxt-link>
      <nuxt-link to="/review/prompts/approved">Approved</nuxt-link>
      <nuxt-link to="/review/prompts/rejected">Rejected</nuxt-link>
    </v-layout>
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