
export const state = () => ({
  errors: [],
  posts: [],
  newPost: '',
});

export const getters = {
  displayPosts(state) {
    return state.posts.map(p => ({
      text: p.content.text,
      promptId: p.post_prompt_id,
    }))
  }
}


export const mutations = {
  SET(state, [key, val]) {
    if (state[key] != undefined) {
      state[key] = val;
    }
  }
};

const handleError = (ctx, error) => ctx.commit('SET', ['errors', [...ctx.state.errors, error.message]]); 

export const actions = {
  async FETCH_POSTS(ctx) {
    try {
      ctx.commit('SET', ['posts', await this.$axios.$get('/api/post/')])
    } catch (error) {
      handleError(ctx, error);
    }
  },
  async SUBMIT_POST(ctx, newPost) {
    try {
      await this.$axios.$post('/api/post/', newPost);
    } catch (error) {
      handleError(ctx, error);
    }
  },
};

