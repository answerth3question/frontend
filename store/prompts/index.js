
export const state = () => ({
  errors: [],
  pending: [],
  rejected: [],
  approved: [],
});


export const mutations = {
  SET(state, [key, val]) {
    if (state[key] !== undefined) {
      state[key] = val;
    }
  },
  SET_PENDING(state, posts) {
    state.pending = posts;
  },
  SET_REJECTED(state, posts) {
    state.rejected = posts;
  },
  SET_APPROVED(state, posts) {
    state.approved = posts;
  },
};

const handleError = (ctx, error) => ctx.commit('SET', ['errors', [...ctx.state.errors, error.message]]); 

export const actions = {
  async FETCH_PROMPTS(ctx) {
    try {
      const prompts = await this.$axios.$get('/api/prompt/');
      ctx.commit('SET', ['pending', prompts.pending]);
      ctx.commit('SET', ['rejected', prompts.rejected]);
      ctx.commit('SET', ['approved', prompts.approved]);
    } catch (error) {
      handleError(ctx, error);
    }
  },
};

