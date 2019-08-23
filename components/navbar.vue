<template>
  <v-toolbar flat class="transparent">
    <v-toolbar-title>
      Welcome {{title}}
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <template v-for="(route, i) in routes">
      <nuxt-link exact :key="i" :to="route.to" class="mx-1">{{route.text}}</nuxt-link>
    </template>
    <div v-if="$auth.loggedIn()">
      <nuxt-link class="mx-1" to="/logout?revoke=true">log out</nuxt-link>
    </div>
    <div v-else>
      <nuxt-link class="mx-1" to="/login">login</nuxt-link>
    </div>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    title: String,
    routes: Array,
  },
}
</script>