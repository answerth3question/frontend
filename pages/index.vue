<template>
  <v-flex>
    <nuxt-child></nuxt-child>
  </v-flex>
</template>

<script>

export default {
  methods: {
    selectPrompt(id) {
      this.$store.commit('prompt/SET', ['selectedId', id]);
    }
  },
  watch: {
    '$route': {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        const np = newVal.params;
        const op = oldVal ? oldVal.params : {};

        if (np.prompt_id && !op.prompt_id) {
          this.selectPrompt(np.prompt_id);
        } else if (!np.prompt_id && op.prompt_id) {
          this.selectPrompt('');
        }
      }
    }
  }
}
</script>