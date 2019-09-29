export const state = () => ({
  id: '',
  email: '',
  username: '',
  role: {
    id: null,
    name: '',
  },
  posts: [],
  prompts: [],
});

export const mutations = {
  SET_PROFILE(state, profile) {
    state.id = profile.id;
    state.email = profile.email;
    state.username = profile.username;
    state.role = {
      id: profile.role.id,
      name: profile.role.name,
    },
    state.posts = profile.posts;
    state.prompts = profile.prompts;
  }
};

export const actions = {
  async FETCH_PROFILE({ commit }) {
    try {
      const profile = await this.$axios.$get('/api/user/profile');
      commit('SET_PROFILE', profile);
    } catch (error) {
      console.error('ERROR FETCHING USER PROFILE:', error);
    }
  }
}