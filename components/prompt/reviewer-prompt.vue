<template>
  <v-card>
    <v-card-title class="blockquote">{{content}}</v-card-title>
    <v-card-actions>
      <v-btn icon><v-icon color="accent">thumb_up</v-icon></v-btn>
      <v-btn icon><v-icon color="accent">thumb_down</v-icon></v-btn>
      <v-spacer></v-spacer>
      <v-btn icon><v-icon color="accent">comment</v-icon></v-btn>
    </v-card-actions>
    <v-divider></v-divider>
    <v-card-text>
      <v-layout v-if="reviews.length" column>
        <v-layout v-for="r in reviews" :key="r.id" px-1>
          <v-flex shrink>
            <v-icon small :color="r.is_approved ? 'blue' : ''">
              {{r.is_approved ? 'thumb_up' : 'thumb_down'}}
            </v-icon>
          </v-flex>
          <v-flex>
            {{r.comments}}
          </v-flex>
        </v-layout>
      </v-layout>
      <v-layout v-else justify-center>
        No reviews
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import BasePrompt from '@/components/prompt/base-prompt'
export default {
  props: {
    id: String,
    date_created: String,
    created_by: String,
    content: String,
    status: String,
    posts: {
      type: Array,
      default: () => [],
    },
    reviews: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    displayDate() {
      return new Date(this.date_created).toLocaleString();
    },
    isReviewer() {
      return this.$store.getters['auth/permission'].includes('reviewer');
    }
  }
}
</script>