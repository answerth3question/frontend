<template>
  <v-layout justify-center align-center>
    <v-flex xs4>
      <v-card width="350" height="500">
        <v-card-title></v-card-title>
        <v-card-text>
          <v-layout justify-center align-center>
            <GoogleLoginButton />
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import GoogleLoginButton from '@/components/login/google-login-btn'
export default {
  auth: false,
  components: {
    GoogleLoginButton,
  },
}
</script>
