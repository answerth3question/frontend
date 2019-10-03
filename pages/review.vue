<template>
  <v-flex>
    <v-layout>
      <v-flex>
        Review!
      </v-flex>
    </v-layout>
    <v-layout>
      <nuxt-child></nuxt-child>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  layout: 'authenticated',
  middleware: 'is-reviewer'
}
</script>