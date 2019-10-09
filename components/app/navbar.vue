<template>
  <v-toolbar
    app
    flat
    class="pink lighten-5"
    clipped-left
  >
    <v-toolbar-title >
      <nuxt-link class="headline black--text" exact to="/">StallWall</nuxt-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <template v-if="$auth.loggedIn()">
      <v-btn icon to="/scrawl"><v-icon>add</v-icon></v-btn>
      <v-menu v-model="showMenu" offset-y max-width="250" min-width="250">
        <template v-slot:activator="{ on }">
          <v-btn icon  v-on="on">
            <v-icon large>account_circle</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-list dense three-line>
            <v-list-tile to="/profile" active-class="haha">
              <v-list-tile-content>
                <v-list-tile-title style="color: green;">
                  {{$store.getters['user/displayRole']}}
                </v-list-tile-title>
                <v-list-tile-title class="body-2">
                  {{user.username}}
                </v-list-tile-title>
                <v-list-tile-sub-title>
                {{user.email}}
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>

          <template v-if="routes.length">
            <v-divider></v-divider>
            <v-list dense>
              <template v-for="(route, i) in routes">
                <v-list-tile :key="i" :to="route.to" active-class="haha">
                  <v-list-tile-content>
                    {{route.text}}
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list>
          </template>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-tile to="/logout?revoke=true">
              <v-list-tile-content>
                Logout
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-menu>
    </template>

    <span v-else>
      <nuxt-link exact to="/login">Login</nuxt-link>
    </span>
  </v-toolbar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      showMenu: false,
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    routes() {
      const userPermissions = this.$store.getters['auth/permission'];
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
            text: 'Review',
          });
        }
      }
      return result;
    }
  }
}
</script>

<style scoped>
.haha {
  color: black;
}
.contributing {
  color: red
}
</style>