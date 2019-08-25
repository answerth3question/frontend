<template>
  <v-app>
    <AppNavbar app/>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AppNavbar from '@/components/navbar'
export default {
  components: {
    AppNavbar
  },
}
</script>