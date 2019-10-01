<template>
  <v-card flat class="blue-grey lighten-5">
    <v-card-title class="title">
      Submit a prompt
    </v-card-title>
    <v-card-text>
      <v-snackbar v-model="success">
        Success!
        <v-btn @click="success = false">Close</v-btn>
      </v-snackbar>
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
      <v-btn :disabled="!valid" class="primary" @click="onSubmit">Submit</v-btn>
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
        this.$store.dispatch('prompt/new/SUBMIT')
      } else {
        console.log('uh oh errors')
      }
    },
  },
  computed: {
    content: {
      get() { return this.$store.state.prompt.new.content },
      set(val) { this.$store.commit('prompt/new/SET', ['content', val]) }
    },
    success: {
      get() { return this.$store.state.prompt.new.success },
      set(val) { this.$store.commit('prompt/new/SET', ['success', val]) },
    },
    rules() {
      return [
        v => (v.length <= this.maxLen) || `Sorry, prompts must be under ${this.maxLen} characters`,
        v => !!v || 'You cannot submit nothing'
      ]
    }
  }
}
</script>