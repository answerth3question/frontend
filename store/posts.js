
export const state = () => ({
  errors: [],
  posts: [],
});


export const mutations = {
  SET(state, [key, val]) {
    if (state[key] != undefined) {
      state[key] = val;
    }
  }
};


export const actions = {
  async FETCH_POSTS({ commit }) {
    try {
      console.log('in FETCH_POSTS')
      const posts = await this.$axios.$get('/api/post/');
      console.log(posts)
      commit('SET', ['posts', posts])
    } catch (error) {
      commit('SET', ['errors', [...state.errors, error]])
    }
  }
};
