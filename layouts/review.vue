<template>
  <v-app>
    <AppNavbar @toggleDrawer="showDrawer = !showDrawer" />
    <AppNavdrawer :routes="routes" />
    <v-content>
      <v-container fluid full-height>
        <v-layout justify-center>
          <nuxt />
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AppNavbar from '@/components/app/navbar'
import AppNavdrawer from '@/components/app/navdrawer'
export default {
  components: {
    AppNavbar,
    AppNavdrawer
  },
  data() {
    return {
      routes: [
        {
          text: 'Prompts',
          to: '/review/prompts',
          children: [
            {
              text: 'Pending',
              to: '/review/prompts/pending',
            },
            {
              text: 'Approved',
              to: '/review/prompts/approved',
            },
            {
              text: 'Rejected',
              to: '/review/prompts/rejected',
            },
          ]
        }
      ],
    }
  },
}
</script>