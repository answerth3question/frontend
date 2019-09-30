export const state = () => ({
  content: '',
})

export const mutations = {
  SET(state, [key, val]) {
    if (state[key] !== undefined) {
      state[key] = val;
    }
  }
}

export const actions = {
  async SUBMIT_PROMPT({ commit, dispatch, state, rootState }) {
    try {
      await this.$axios.$post(`/api/prompt/`, { content: state.content });
      await dispatch('prompts/FETCH_PROMPTS', null, { root: true });
    } catch (error) {
      
    }
  },
}