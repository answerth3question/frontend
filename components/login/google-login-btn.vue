<template>
  <v-hover v-model="hover">
    <button @click="$auth.login('google')">
      <v-img contain :src="src" width="220"></v-img>
    </button>
  </v-hover>
</template>

<script>
export default {
  data() {
    return {
      hover: false
    }
  },
  computed: {
    src() {
      const variant = this.hover ? 'pressed' : 'normal';
      return require(`~/assets/img/btn_google_signin_light_${variant}_web@2x.png`)
    }
  }
}
</script>
