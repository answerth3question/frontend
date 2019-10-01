<template>
  <v-card flat class="transparent">
    <v-card-title class="title">
      Contribute a Prompt :)
    </v-card-title>
    <v-card-text>
      <v-snackbar fixed :timeout="0" bottom right color="success" v-model="success">
        Success!
        <v-btn flat @click="success = false">Close</v-btn>
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
      <v-btn :disabled="!valid" :loading="busy" class="primary" @click="onSubmit">Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      maxLen: 240,
      valid: true,
    }
  },
  methods: {
    ...mapMutations('prompt/new', ['SET']),
    onReset() {
      this.content = '';
      this.$refs.form.resetValidation();
    },
    async onSubmit() {
      if (this.$refs.form.validate()) {
        await this.$store.dispatch('prompt/new/SUBMIT')
        this.onReset();
      } else {
        console.log('uh oh errors')
      }
    },
  },
  computed: {
    ...mapState('prompt/new', {
      busy: s => s.busy,
      _content: 'content',
      _success: s => s.success,
    }),
    content: {
      get() { return this._content },
      set(val) { this.SET(['content', val]) },
    },
    success: {
      get() { return this._success },
      set(val) { this.SET(['success', val]) },
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