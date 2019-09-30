export const state = () => ({
  content: '',
  prompt_id: '',
})

export const mutations = {
  SET(state, [key, val]) {
    if (state[key] !== undefined) {
      state[key] = val;
    }
  }
}

export const actions = {
  async SUBMIT_POST({ commit, dispatch, state, rootGetters }) {
    try {
      await this.$axios.$post(`/api/post/create`, {
        content: state.content,
        prompt_id: state.prompt_id,
      });
      await dispatch('posts/FETCH', null, { root: true });
    } catch (error) {
      
    }
  },
}