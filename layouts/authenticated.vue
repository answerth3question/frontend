<template>
  <v-app>
    <AuthenticatedNavDrawer  />
     <AppNavbar />
    <v-content>
      <v-container fluid fill-height>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AuthenticatedNavDrawer from '@/components/layouts/authenticated-navdrawer'
import AppNavbar from '@/components/navbar'
export default {
  components: {
    AuthenticatedNavDrawer,
    AppNavbar,
  },
}
</script>
