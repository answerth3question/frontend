import jwt from 'jsonwebtoken';

export const state = () => ({
  user: null,
  id_token: null,
  state: '',
  strategy: '',
});

export const mutations = {
  SET(state, [key, val]) {
    state[key] = val;
  }
}

export const getters = {
  role(state) {
    if (state.id_token) {
      return jwt.decode(state.id_token).user_claims.role;
    }
    return null;
  },
}

