<template>
  <v-layout>
    <v-flex>
      <v-card flat color="transparent">
        View and edit personal information and past prompt and response submissions
      </v-card>
      <v-card flat color="transparent">
        <v-card-text>
          <p> Public name: {{user.username}} </p>
          <p> Email: {{user.email}} </p>
        </v-card-text>
      </v-card>
      
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