<template>
  <v-app>
    <the-public-toolbar app></the-public-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import ThePublicToolbar from '@/components/the-public-toolbar'
export default {
  middleware: 'auth',
  components: {
    ThePublicToolbar
  }
}
</script>


