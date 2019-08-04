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
      Home {{jake}}
      <v-btn @click="$auth.loginWith('google')">Log in</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  computed: {
    jake() {
      return process.env.HELLO
    }
  }
}
</script>
