<template>
  <v-layout>
    <v-flex>
      <p> Public name: {{user.username}} </p>
      <p> Email: {{user.email}} </p>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('auth', ['user'])
  }
}
</script>