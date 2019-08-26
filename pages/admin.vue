<template>
  <v-layout>
    <v-flex>
      <nuxt-child></nuxt-child>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  layout: 'authenticated',
  middleware: 'is-admin',
  mounted() {
    this.$store.dispatch('admin/getAppUsers');
  },
}
</script>