<template>
  <v-card flat class="blue-grey lighten-5">
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
      maxLen: 240,
      valid: true,
    }
  },
  methods: {
    onReset() {
      this.content = '';
      this.$refs.form.resetValidation();
    },
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('newPrompt/SUBMIT_PROMPT')
      } else {
        console.log('uh oh errors')
      }
    },
  },
  computed: {
    content: {
      get() { return this.$store.state.newPrompt.content },
      set(val) { this.$store.commit('newPrompt/SET', ['content', val]) }
    },
    rules() {
      return [
        v => (v && v.length <= this.maxLen) || `Sorry, prompts must be under ${this.maxLen} characters`,
      ]
    }
  }
}
</script>