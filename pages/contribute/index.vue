<template>
  <v-layout>
    <v-flex>
      Submit a new prompt or respond to one
      <v-textarea
        outline
        :counter="postMaxLen"
        :rules="[() => newPost.length <= postMaxLen || `Oops, you gotta keep it under ${postMaxLen} characters`]"
        v-model="newPost"
      ></v-textarea>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  data() {
    return {
      postMaxLen: 20,
    }
  },
  methods: {
    ...mapMutations('posts', ['SET'])
  },
  computed: {
    ...mapState('posts', {
      _newPost: state => state.newPost,
    }),
    newPost: {
      get() { return this._newPost },
      set(val) { this.SET(['newPost', val]) },
    },
  }
}
</script>