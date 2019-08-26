<template>
  <v-app>
    <AppNavbar />
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AppNavbar from '@/components/nav/navbar'
export default {
  components: {
    AppNavbar
  },
}
</script>