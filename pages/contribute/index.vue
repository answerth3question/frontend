<template>
  <v-layout>
    <v-flex>
      <NewPost />
      <NewPrompt />
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import NewPost from '@/components/contribute/new-post'
import NewPrompt from '@/components/contribute/new-prompt'
export default {
  components: {
    NewPost,
    NewPrompt,
  },
  data() {
    return {
      postMaxLen: 20,
    }
  },
  methods: {
    ...mapMutations('post', ['SET'])
  },
  computed: {
    ...mapState('post', {
      _newPost: state => state.newPost,
    }),
    newPost: {
      get() { return this._newPost },
      set(val) { this.SET(['newPost', val]) },
    },
  }
}
</script>