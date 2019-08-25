<template>
  <v-navigation-drawer 
    app 
    fixed 
    clipped 
    permanent
    class="blue lighten-5"
  >
    <v-list dense class="pt-1">
      <template v-for="(route, i) in routes">
        <!-- routes with child routes -->
        <v-list-group v-if="route.children && route.children.length" :key="i" value="true">
          <template v-slot:activator>
            <v-list-tile exact :to="route.to">
              <v-list-tile-title>{{route.text}}</v-list-tile-title>
            </v-list-tile>
          </template>
          <template v-for="(child, i) in route.children">
            <v-list-tile :key="i" exact :to="child.to">
              <v-list-tile-title>{{child.text}}</v-list-tile-title>
            </v-list-tile>
          </template>
          <v-list-tile ></v-list-tile>
        </v-list-group>
        <!-- routes WITHOUT children -->
        <v-list-tile v-else :key="i" :to="route.to">
          <v-list-tile-title>{{route.text}}</v-list-tile-title>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      adminRoutes: [
        {
          to: '/admin/users',
          text: 'Users',
        },
      ],
      reviewerRoutes: [],
      contributerRoutes: [],
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