<template>
  <v-toolbar flat class="transparent">
    <v-toolbar-title>
      Welcome {{title}}
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <template v-for="(route, i) in routes">
      <nuxt-link :key="i" :to="route.to" class="mx-1">{{route.text}}</nuxt-link>
    </template>
    <div v-if="$auth.isLoggedIn()">
      <nuxt-link class="mx-1" to="/logout">log out</nuxt-link>
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