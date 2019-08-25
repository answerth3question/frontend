<template>
  <v-navigation-drawer 
    app 
    fixed 
    clipped 
    permanent
    class="blue lighten-5"
  >
    <v-list dense class="pt-1">
      
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      adminRoutes: [
        {
          to: '/',
          text: 'Home',
        },
        {
          to: '/admin',
          text: 'Admin'
        },
      ],
      reviewerRoutes: [
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
      ],
      contributerRoutes: [
        {
          to: '/',
          text: 'Home',
        },
        {
          to: '/contributer',
          text: 'Profile'
        }
      ],
    };
  },
  computed: {
    routes() {
      const userPermissions = this.$store.getters['auth/claims'].permission;
      const result = [];

      if (userPermissions.includes('admin')) {
        result.push({
          to: '/admin',
          text: 'Admin',
          children: this.adminRoutes,
        });
      }
      if (userPermissions.includes('reviewer')) {
        result.push({
          to: '/review',
          text: 'Review',
          children: this.reviewerRoutes,
        });
      }
      if (userPermissions.includes('contributer')) {
        result.push({
          to: '/contribute',
          text: 'Contribute',
          children: this.contributerRoutes,
        });
      }
      return result;
    }
  }
}
</script>