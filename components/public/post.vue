<template>
  <v-card flat class="transparent">
    <v-card-text>
      {{content}}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      required: true,
    }
  }
}
</script>