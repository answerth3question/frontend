<template>
  <v-list-tile
    nuxt
    :exact="exact"
    :to="to"
    class="grey--text text--lighten-1"
    active-class="white--text"
  >
    <v-list-tile-title class="font-weight-light" :class="{ 'ml-3' : isChild }">
      {{text}}
    </v-list-tile-title>
  </v-list-tile>
</template>

<script>
export default {
  props: {
    text: String,
    to: [String, Object],
    isChild: Boolean,
    exact: Boolean
  }
}
</script>