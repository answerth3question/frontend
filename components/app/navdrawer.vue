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
    <v-list dark>
      <template v-for="route in routes">
        <v-list-group
          v-if="route.children"
          :key="route.text"
          class="grey--text text--lighten-1"
          active-class="white--text"
          value="true"
        >
          <template v-slot:activator>
            <v-list-tile :key="route.to" :to="route.to"  active-class="white--text">
              <!-- <v-list-tile-title class="font-weight-thin grey--text text--lighten-1"> -->
              <v-list-tile-title>
                {{route.text}}
              </v-list-tile-title>
            </v-list-tile>
          </template>
          <template v-for="child in route.children">
            <v-list-tile
              :key="child.to"
              class="grey--text text--lighten-1"
              active-class="white--text"
              nuxt
              :to="child.to"
            >
              <v-list-tile-title class="ml-2 font-weight-light">
                {{child.text}}
              </v-list-tile-title>
            </v-list-tile>
          </template>
        </v-list-group>
        <v-list-tile
          v-else
          :key="route.text"
          class="grey--text text--lighten-1"
          active-class="white--text"
          exact
          nuxt
          :to="route.to"
        >
          <v-list-tile-title class="font-weight-light">
            {{route.text}}
          </v-list-tile-title>
        </v-list-tile>
      </template>
    </v-list>
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
.v-list__group::before, .v-list__group::after {
  height: 0  
}
</style>
