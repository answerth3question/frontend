<template>
  <v-navigation-drawer
    app
    permanent
    absolute
    floating
    clipped
    width="200"
    dark
    class="accent darken-2"
  >
    <template v-for="route in routes">
      <template v-if="route.children">
        <v-list-tile 
          nuxt
          :key="route.to" 
          :to="route.to" 
          class="grey--text text--lighten-1"
          active-class="white--text"
        >
          <v-list-tile-title class="font-weight-light">
            {{route.text}}
          </v-list-tile-title>
        </v-list-tile>
        <template v-for="child in route.children">
          <v-list-tile
            nuxt
            :key="child.to"
            :to="child.to"
            class="grey--text text--lighten-1"
            active-class="white--text"
          >
            <v-list-tile-title class="ml-3 font-weight-light">
              {{child.text}}
            </v-list-tile-title>
          </v-list-tile>
        </template>
      </template>
      <template v-else>
        <v-list-tile
          nuxt
          exact
          :key="route.to"
          :to="route.to"
          class="grey--text text--lighten-1"
          active-class="white--text"
        >
          <v-list-tile-title class="font-weight-light">
            {{route.text}}
          </v-list-tile-title>
        </v-list-tile>
      </template>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    routes: Array,
  },
}
</script>

<style scoped>

</style>
