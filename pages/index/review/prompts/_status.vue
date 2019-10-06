<template>
  <v-flex>
    <nuxt-child></nuxt-child>
  </v-flex>
</template>

<script>
export default {
  validate({ params }) {
    return ['approved', 'pending', 'rejected'].includes(params.status);
  },
}
</script>