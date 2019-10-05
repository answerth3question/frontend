<template>
  <v-flex>
    <v-layout>
      <v-flex>
        Review posts submitted by contributers
      </v-flex>
    </v-layout>
    <v-layout>
      <prompt-list :prompts="$store.getters['prompt/pending/itemsByDate']">
        <template v-slot:prompt="{ id, content, reviews }">
          <v-card>
            <v-card-title class="blockquote">{{content}}</v-card-title>
            <v-card-actions>
              <v-btn icon><v-icon color="accent">check</v-icon></v-btn>
              <v-btn icon><v-icon color="accent">clear</v-icon></v-btn>
              <v-spacer></v-spacer>
              <v-btn icon><v-icon color="accent">comment</v-icon></v-btn>
            </v-card-actions>
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
      </prompt-list>
    </v-layout>
  </v-flex>
</template>

<script>
import PromptList from '@/components/public/prompt-list'
export default {
  components: {
    PromptList,
  },
  methods: {
    approve(id) {
      console.log(id)
    },

  }
}
</script>