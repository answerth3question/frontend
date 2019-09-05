<template>
  <v-app>    
    <AppNavbar />
    <v-content>
      <v-container fluid fill-height>
        <!-- <v-toolbar absolute dense flat color="transparent">
          <v-spacer></v-spacer>
          <v-btn icon><v-icon>add</v-icon></v-btn>
        </v-toolbar> -->
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AppNavbar from '@/components/nav/navbar'
export default {
  components: {
    AppNavbar,
  },
}
</script>
