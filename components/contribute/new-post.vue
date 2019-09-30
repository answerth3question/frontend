<template>
  <v-card flat class="blue-grey lighten-5">
    <v-card-title>
      <blockquote class="blockquote">What is your favorite color?</blockquote> 
    </v-card-title>
    <v-card-text>
      <v-form 
        @submit.prevent="onSubmit"
        ref="form" 
        v-model="valid"
        lazy-validation
      >
        <v-textarea
          solo
          flat
          auto-grow
          :counter="maxLen"
          :rules="rules"
          v-model="content"
        ></v-textarea>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat color="secondary" @click="onReset">Reset</v-btn>
      <v-btn class="primary" @click="onSubmit">Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      maxLen: 1000,
      valid: true,
    }
  },
  methods: {
    onReset(e) {
      this.content = '';
      this.$refs.form.resetValidation();
    },
    onSubmit(e) {
      if (this.$refs.form.validate()) {
        console.log('submitting!')
      } else {
        console.log('oh oh erreos!')
      }
    },
  },
  computed: {
    selectedPrompt() {
      return this.$store.getters['prompt/selected'];
    },
    content: {
      get() { return this.$store.state.newPost.content },
      set(val) { this.$store.commit('newPost/SET', ['content', val]) },
    },
    rules() {
      return [
        v => (v && v.length <= this.maxLen) || `Sorry, posts must be under ${this.maxLen} characters`,
      ]
    }
  }
}
</script>