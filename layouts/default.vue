<template>
  <v-app>
    <AppNavbar app :routes="routes" />
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
  computed: {
    routes() {
      const userRole = this.$store.getters['auth/role'];

      let ret = [{ to: '/', text: 'Home' }];
      
      switch(userRole) {
        case 'admin':
          ret = [
            ...ret, 
            {
              to: '/admin',
              text: 'Admin',
            }
          ];
          break;
        case 'reviewer':
          ret = [
            ...ret,
            {
              to: '/reviewer',
              text: 'Reviewer',
            }
          ];
          break;
        case 'user':
          ret = [
            ...ret,
            {
              to: '/user',
              text: 'Profile',
            }
          ];
          break;
      }
      return ret;
    }
  }
}
</script>