<template>
  <v-layout>
    <v-flex>
      This is the user management page for admin
      <ul>
        <li v-for="u in $store.state.admin.users" :key="u.id">
          {{u.username}} {{u.email}} <button @click="getUserDetails(u.id)">Details</button>
        </li>
      </ul>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  methods: {
    async getUserDetails(userId) {
      try {
        const user = await this.$axios.$get('/api/admin/user/' + userId);
        console.log(user)
      } catch (error) {
        console.error(error)
      }
    } 
  }
}
</script>