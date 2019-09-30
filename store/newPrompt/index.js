import { handleActionError } from '@/util/index'

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
  async SUBMIT_PROMPT(ctx) {
    try {
      ctx.commit('SET', ['busy', true]);
      await this.$axios.$post(`/api/prompt/create`, { content: ctx.state.content });
      ctx.commit('SET', ['content', '']);
      ctx.commit('SET', ['submitSuccess', true]);
      ctx.dispatch('prompt/FETCH', null, { root: true });
    } catch (error) {
      handleActionError(ctx, error)
    } finally {
      ctx.commit('SET', ['busy', false]);
    }
  },
}