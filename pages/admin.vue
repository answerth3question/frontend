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
  mounted() {
    this.$store.dispatch('admin/getAppUsers');
  },
  asyncData(ctx) {
    ctx.store.dispatch('admin/getAppUsers');
  },
}
</script>