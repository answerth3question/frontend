<template>
  <v-layout>
    <v-flex>
      This the the 'profile' wrapper page
      <nuxt-child></nuxt-child>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  layout: 'authenticated'
}
</script>