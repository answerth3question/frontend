
export const state = () => ({
  errors: [],
  pending: [],
  rejected: [],
  approved: [],
});

export const mutations = {
  SET(state, [key, val]) {
    if (state[key] != undefined) {
      state[key] = val;
    }
  },
  SET_ALL(state, posts) {
    state.pending = posts.pending;
    state.rejected = posts.rejected;
    state.approved = posts.approved;
  },
  SET_APPROVED(state, approvedPosts) {
    state.approved = approvedPosts;
  },
};

const handleError = (ctx, error) => ctx.commit('SET', ['errors', [...ctx.state.errors, error.message]]); 

export const actions = {
  async FETCH(ctx) {
    try {
      const perms = ctx.rootGetters['auth/permission'];
      if (perms && perms.includes('reviewer')) {
        ctx.commit('SET_ALL', await this.$axios.$get('/api/post/all'));
      } else {
        ctx.commit('SET_APPROVED', await this.$axios.$get('/api/post/approved'));
      }
    } catch (error) {
      handleError(ctx, error);
    }
  }
};

