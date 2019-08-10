
export const state = () => ({
  user: null,
  strategy: '',
});

export const mutations = {
  SET(state, [key, val]) {
    state[key] = val;
  }
}
