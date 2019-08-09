
export const state = () => ({
  user: null,
});

export const mutations = {
  SET(state, [key, val]) {
    state[key] = val;
  }
}
