<template>
  <v-toolbar flat class="transparent">
    <v-toolbar-title>
      Welcome
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <nuxt-link class="mx-1" to="/">HOME</nuxt-link>
    <nuxt-link class="mx-1" to="/one">ONE</nuxt-link>
    <nuxt-link class="mx-1" to="/two">TWO</nuxt-link>
    <nuxt-link class="mx-1" to="/three">THREE</nuxt-link>
    <div v-if="$auth.isLoggedIn()">
      <nuxt-link class="mx-1" to="/logout">LOG OUT</nuxt-link>
    </div>
    <div v-else>
      <nuxt-link class="mx-1" to="/login">LOGIN</nuxt-link>
    </div>
  </v-toolbar>
</template>
