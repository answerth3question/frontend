export const state = () => ({
  users: [],
  errors: [],
});

export const mutations = {
  SET(state, [key, val]) {
    state[key] = val;
  }
}

export const actions = {
  async getAppUsers({ commit, state, rootState }) {
    if (!state.users.length) {
      try {
        const result = await this.$axios.$get('/api/admin/users');
        commit('SET', ['users', result.users]);
      } catch (error) {
        console.log(error)
        commit('SET', ['errors', [...state.errors, error.message]]);
      }
    }
  },

}