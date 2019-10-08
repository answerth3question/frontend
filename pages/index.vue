<template>
  <v-flex>
    <nuxt-child></nuxt-child>
  </v-flex>
</template>

<script>

export default {
  methods: {
    checkParams(to, from, paramKey, callbackSetter) {
      const toParams = to.params;
      const fromParams = from ? from.params : {};
      if (
        toParams[paramKey] !== undefined &&
        toParams[paramKey] !== fromParams[paramKey]
      ) {
        callbackSetter(toParams[paramKey]);
      } else if (
        !toParams[paramKey] && 
        toParams[paramKey] !== 0 && 
        fromParams[paramKey]
      ) {
        callbackSetter();
      }
    },
  },
  watch: {
    '$route': {
      immediate: true,
      deep: true,
      handler(to, from) {
        const commit = this.$store.commit;
        
        const checkers = {
          prompt_id: (val = '') => commit('prompt/SET', ['selectedId', val]),
        }

        Object.keys(checkers).forEach(key => this.checkParams(to, from, key, checkers[key]));
      }
    }
  }
}
</script>