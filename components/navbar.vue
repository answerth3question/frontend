<template>
  <v-toolbar app fixed clipped-left flat class="teal lighten-5">
    <v-toolbar-title>
      <nuxt-link  style="color: black;" exact to="/">StallWall</nuxt-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <nuxt-link v-if="$auth.loggedIn()" exact to="/logout?revoke=true">Logout</nuxt-link>
    <nuxt-link v-else exact to="/login">Login</nuxt-link>
  </v-toolbar>
</template>

