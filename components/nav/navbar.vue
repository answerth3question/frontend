<template>
  <v-toolbar app flat extended dense class="teal lighten-5">
    <v-toolbar-title >
      <nuxt-link class="headline" style="color: black;" exact to="/">StallWall</nuxt-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <span v-if="$auth.loggedIn()">
      <nuxt-link exact to="/logout?revoke=true">Logout</nuxt-link>
    </span>
    <span v-else>
      <nuxt-link exact to="/login">Login</nuxt-link>
    </span>
    <template v-slot:extension>
      <nuxt-link
        v-for="r in routes"
        :key="r.text"
        :to="r.to"
        class="mr-3"
      >
        {{r.text}}
      </nuxt-link>
    </template>
  </v-toolbar>
</template>

<script>
export default {
  computed: {
    routes() {
      const userPermissions = this.$store.getters['auth/claims'].permission;
      const result = [];
      if (userPermissions) {
        if (userPermissions.includes('admin')) {
        result.push({
          to: '/admin',
          text: 'Admin',
        });
        }
        if (userPermissions.includes('reviewer')) {
          result.push({
            to: '/review',
            text: 'Review Posts',
          });
        }
        if (userPermissions.includes('contributer')) {
          result.push({
            to: '/contribute',
            text: 'Contribute',
          });
        }
      }
      return result;
    }
  }
}
</script>