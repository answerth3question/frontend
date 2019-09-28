import jwt from 'jsonwebtoken';

export const state = () => ({
  // user: null,
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
  permission(state) {
    if (state.id_token) {
      const claims = jwt.decode(state.id_token).user_claims;
      if (claims) {
        return claims.permission;
      }
    }
    return null;
  },
}

