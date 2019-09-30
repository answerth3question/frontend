<template>
  <div>
    Hello

    <pre>
      {{$store.getters['prompt/selected']}}
    </pre>
  </div>
</template>

<script>
export default {
  watch: {
    '$route': {
      immediate: true,
      deep: true,
      handler(val) {
        this.$store.commit('prompt/SET', ['selectedId', val.params.id]);
      }
    }
  }
}
</script>

