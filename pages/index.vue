<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      This is the home page
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  auth: false,
  // layout({ store }) {
  //   const userRole = store.getters['auth/role'];
  //   const loggedIn = store.getters['auth/loggedIn']();
  //   if (!loggedIn) {
  //     return 'default';
  //   }
  //   switch(userRole) {
  //     case 'admin':
  //       return 'admin';
  //     case 'reviewer':
  //       return 'reviewer';
  //     default:
  //       return 'user';
  //   }
  // }
}
</script>