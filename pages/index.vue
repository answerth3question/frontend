<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      This is the home page
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  auth: false,
  mounted() {
    // this.$auth.storage.syncUniversal('id_token');
  }
}
</script>