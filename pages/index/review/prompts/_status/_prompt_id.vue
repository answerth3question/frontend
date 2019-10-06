<template>
  <pre>
    {{prompt}}
  </pre>
</template>

<script>
export default {
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     console.log(to)
  //     vm.$store.commit('prompt/SET', ['selectedId', to.params.prompt_id]);
  //   });
  // },
  // beforeRouteLeave(to, from, next) {
  //   this.$store.commit('prompt/SET', ['selectedId', null]);
  //   next()
  // },
  computed: {
    prompt() {
      return this.$store.getters['prompt/selected'];
    }
  }
}
</script>