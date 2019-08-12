<template>
  <v-app>
    <AppNavbar
      app
      title="Admin"
      :routes="routes"
    />
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
  middleware: 'is-admin',
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
          to: '/admin',
          text: 'Admin',
        },
        {
          to: '/admin/users',
          text: 'Users'
        }
      ]
    }
  }
}
</script>

