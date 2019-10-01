<template>
  <v-layout>
    <v-flex>
      <v-layout>
        <v-flex>
          <p>Scrawl on the Stall Wall</p>
          <p>This will be visible any time the route looks like 'host.com/scrall/...'</p>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-layout>
        <v-flex>
          <nuxt-child></nuxt-child>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

