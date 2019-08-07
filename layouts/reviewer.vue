<template>
  <v-app>
   <v-content>
     <v-container>
       <v-layout>
         <v-flex>
           This is the reviewer layout
         </v-flex>
       </v-layout>
       <nuxt />
     </v-container>
   </v-content>
  </v-app>
</template>

<script>
export default {
  middleware: ['auth'],
}
</script>