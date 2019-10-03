<template>
  <v-app>
    <AppNavbar />
    <v-content>
      <v-container fluid fill-height :class="myClass">
        <v-layout justify-center>
          <nuxt />
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AppNavbar from '@/components/app/navbar'
export default {
  components: {
    AppNavbar
  },
  data() {
    return {
      classIndex: 3,
    }
  },
  computed: {
    myClass() {
      return [
        '',
        'secondary lighten-5',
        'pink lighten-5',
        '#123456'
      ][this.classIndex];
    }
  }
}
</script>