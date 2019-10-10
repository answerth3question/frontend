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
        >
          <template v-slot:activator>
            <NavdrawerItem
              :key="route.to"
              :to="route.to"
              :text="route.text"
            />
          </template>
          <template v-for="child in route.children">
            <NavdrawerItem
              isChild
              :key="child.to"
              :to="child.to"
              :text="child.text"
            />
          </template>
        </v-list-group>
        
        <NavdrawerItem
          v-else
          exact
          :key="route.to"
          :to="route.to"
          :text="route.text"
        />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import NavdrawerItem from '@/components/app/navdrawer-item'
export default {
  props: {
    routes: Array,
  },
  components: {
    NavdrawerItem,
  },
}
</script>

<style scoped>
.v-list__group::before, .v-list__group::after {
  height: 0  
}
</style>
