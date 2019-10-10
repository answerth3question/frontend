<template>
  <v-app>
    <AppNavbar @toggleDrawer="showDrawer = !showDrawer" />
    <AppNavdrawer :routes="routes" />
    <v-content>
      <v-container fluid full-height>
        <!-- <v-layout>
          <v-btn @click="toggle">toggle</v-btn>
        </v-layout> -->
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
  methods: {
    // toggle() {
    //   this.routes[1].showChildren = !this.routes[1].showChildren
    // }
  },
  data() {
    return {
      routes: [
        {
          text: 'Review',
          to: '/review',
        },
        {
          text: 'Prompts',
          to: '/review/prompts',
          showChildren: true,
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
        },
        {
          text: 'Posts',
          to: '/review/posts',
          showChildren: false,
          children: [
            {
              text: 'Pending',
              to: '/review/posts/pending',
            },
            {
              text: 'Approved',
              to: '/review/posts/approved',
            },
            {
              text: 'Rejected',
              to: '/review/posts/rejected',
            },
          ]
        }
      ],
    }
  },
}
</script>