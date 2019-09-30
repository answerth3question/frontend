
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
  SET_ALL(state, prompts) {
    state.pending = prompts.pending;
    state.rejected = prompts.rejected;
    state.approved = prompts.approved;
  },
  SET_APPROVED(state, approvedPrompts) {
    state.approved = approvedPrompts;
  },
};

const handleError = (ctx, error) => ctx.commit('SET', ['errors', [...ctx.state.errors, error.message]]); 

export const actions = {
  async FETCH(ctx) {
    try {
      const perms = ctx.rootGetters['auth/permission'];
      if (perms && perms.includes('reviewer')) {
        const prompts = await this.$axios.$get('/api/prompt/all')
        console.log(prompts)
        ctx.commit('SET_ALL', prompts);
      } else {
        ctx.commit('SET_APPROVED', await this.$axios.$get('/api/prompt/approved'));
      }
    } catch (error) {
      handleError(ctx, error);
    }
  },
};

