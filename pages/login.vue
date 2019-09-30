<template>
  <v-layout justify-center align-center>
    <v-flex xs4>
      <v-card>
        <v-card-title class="title text-xs-center">
          Log in or create an account
        </v-card-title>
        <v-card-text>

          <template v-for="(b, i) in buttons">
            <v-layout :key="i" justify-center>
              <GoogleLoginButton />
            </v-layout>
          </template>

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
  computed: {
    buttons() {
      const srcs = {
        normal: require('~/assets/img/btn_google_signin_light_normal_web@2x.png'),
        focus: require('~/assets/img/btn_google_signin_light_focus_web@2x.png'),
        pressed: require('~/assets/img/btn_google_signin_light_pressed_web@2x.png'),
      }
      return [
        {
          class: 'mb-3',
          src: srcs.normal,
          // /Users/jacobalbright/development/answerth3question/frontend/assets/img/btn_google_signin_light_pressed_web@2x.png
          onClick: () => this.$auth.login('google'),
        }
      ]
    }
  }
}
</script>
