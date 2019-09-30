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
  async SUBMIT_POST({ commit, dispatch, state, rootGetters }) {
    try {
      const prompt = rootGetters['prompt/selected'];
      if (prompt) {
        await this.$axios.$post(`/api/post/create`, {
          content: state.content,
          prompt_id: prompt.id,
        });
      }
      await dispatch('post/FETCH', null, { root: true });
    } catch (error) {
      
    }
  },
}