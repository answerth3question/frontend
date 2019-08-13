<template>
  <v-app>
    <AppNavbar app title="Reviewer" :routes="routes" />
   <v-content>
     <v-container>
       <v-layout>
         <v-flex>
           This is the reviewer layout
         </v-flex>
       </v-layout>
       <nuxt />
     </v-container>
   </v-content>
  </v-app>
</template>

<script>
import AppNavbar from '@/components/navbar'
export default {
  middleware: 'is-reviewer',
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
          to: '/reviewer',
          text: 'Profile'
        },
        {
          to: '/reviewer/submissions',
          text: 'Submissions'
        }
      ]
    }
  }
}
</script>