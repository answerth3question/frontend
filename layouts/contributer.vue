<template>
  <v-app>
    <AppNavbar app title="User" :routes="routes" />
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
  data() {
    return {
      routes: [
        {
          to: '/',
          text: 'Home',
        },
        {
          to: '/contributer',
          text: 'Profile'
        }
      ]
    }
  }
}
</script>