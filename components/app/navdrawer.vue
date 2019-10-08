<template>
  <v-navigation-drawer
    app
    permanent
    absolute
    floating
    clipped
    width="200"
    class="accent indigo--text"
  >
    <v-list class="accent--text text--lighten-4">
      <template v-for="route in routes">
        <v-list-group 
          v-if="route.children" 
          :key="route.to"
          :value="true"
          
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>
                <strong>{{route.text}}</strong> 
              </v-list-tile-title>
            </v-list-tile>
          </template>
          <template v-for="child in route.children">
            <v-list-tile :key="child.to" :to="child.to" active-class="blue--lighten-3 white--text">
              <v-list-tile-title>
                {{child.text}}
              </v-list-tile-title>
            </v-list-tile>
          </template>
        </v-list-group>
        <v-list-tile v-else :key="route.to" :to="route.to" active-class="blue--lighten-3 white--text">
          <v-list-tile-title>
            {{route.text}}
          </v-list-tile-title>
        </v-list-tile>
      </template>
      <!-- <v-list-tile acitve-class="hihi" to="/review/prompts/pending">
        <v-list-tile-title>Prompts</v-list-tile-title>
      </v-list-tile> -->
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
.hihi {
  color: gray;
}
</style>