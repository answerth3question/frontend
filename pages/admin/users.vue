<template>
  <v-layout>
    <v-flex>
      This is the user management page for admin
      <ul>
        <li v-for="u in $store.state.admin.users" :key="u.id">
          {{u.username}} {{u.email}}
        </li>
      </ul>
    </v-flex>
  </v-layout>
</template>