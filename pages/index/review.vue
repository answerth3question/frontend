<template>
  <v-flex>
    <v-layout>
      <nuxt-child></nuxt-child>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  layout: 'review',
  middleware: 'is-reviewer'
}
</script>