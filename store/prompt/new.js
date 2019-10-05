import helpers from '@/util/helpers'

export const state = () => ({
  content: '',
  success: false,
  busy: false,
  errors: [],
})

export const mutations = {
  SET(state, [key, val]) {
    if (state[key] !== undefined) {
      state[key] = val;
    }
  }
}

export const actions = {
  async SUBMIT(ctx) {
    try {
      ctx.commit('SET', ['busy', true]);
      await this.$axios.$post(`/api/prompt/create`, { content: ctx.state.content.trim() });
      ctx.commit('SET', ['success', true]);
      ctx.dispatch('prompt/pending/FETCH', { includeReviews: true }, { root: true });
    } catch (error) {
      helpers.handleActionError(ctx, error);
    } finally {
      ctx.commit('SET', ['busy', false]);
    }
  },
}