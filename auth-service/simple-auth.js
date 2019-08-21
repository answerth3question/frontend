import nanoid from 'nanoid';
import jwt from 'jsonwebtoken';
import Storage from './simple-storage'

const strategies = {
  google: {
    authEndpoint: 'https://accounts.google.com/o/oauth2/auth',
    userEndpoint: '/api/auth/login?strategy=google',
    authScope: ['openid', 'profile', 'email'],
    login(redirectUri, state) {
      const url = `${this.authEndpoint}?` +
        `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
        `response_type=code&` +
        `scope=${this.authScope.reduce((acc, x, i, arr) => (i < arr.length - 1 ? acc + x + '%20' : acc + x), '')}&` +
        `redirect_uri=${redirectUri}&` +
        `state=${state}&` +
        `nonce=${nanoid()}`;
      window.location = url;
    },
    userInfo(ctx, redirectUri) {
      return ctx.$axios.$post(this.userEndpoint, {
        code: ctx.query.code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: redirectUri,
      });
    }
  }
}

function createVuexAuthMod(statorade) {
  return {
    namespaced: true,
    state: () => statorade,
    mutations: {
      SET(state, [key, val]) {
        state[key] = val;
      }
    },
    getters: {
      role(state) {
        if (state.id_token) {
          return jwt.decode(state.id_token).user_claims.role;
        }
        return null;
      },
      loggedIn(state) {
        return token => {
          let _token = token || state.id_token;
          if (!_token) {
            return false;
          }
          return Date.now() / 1000 < jwt.decode(_token).exp;
        }
      }
    }
  }
}

export default class SimpleAuth {
  redirect = {
    home: '/',
    login: '/login',
    callback: '/callback',
    logout: '/logout',
  }

  redirectUri = 'http://localhost:3000' + this.redirect.callback;

  strategy = 'google'

  constructor(ctx) {
    this.ctx = ctx;
    this.storage = new Storage(ctx);
  }

  get isAtLogin() { return this.ctx.route.path === this.redirect.login };
  get isAtLogout() { return this.ctx.route.path === this.redirect.logout };
  get isAtCallback() { return this.ctx.route.path === this.redirect.callback };

  loggedIn(token) {
    return this.ctx.store.getters['auth/loggedIn'](token);
  }

  login(strategyName) {
    if (strategyName && strategies[strategyName]) {
      this.strategy = strategyName;
    }
    const state = nanoid();
    this.storage.setCookie('state', state);
    strategies[this.strategy].login(this.redirectUri, state);
  }

  async fetchUser() {
    const prevState = this.storage.getCookie('state');
    this.storage.removeCookie('state');
    console.log(prevState, this.ctx.query.state)
    if (prevState !== this.ctx.query.state) {
      return;
    }
    try {
      const user = await strategies[this.strategy].userInfo(this.ctx, this.redirectUri);
      console.log('successful login of user', user)
      // this.storage.setState('id_token', user.id_token);
      const prevState = this.ctx.store.state.auth;
      this.ctx.store.registerModule('auth', createVuexAuthMod({
        ...prevState,
        id_token: user.id_token
      }))
      // console.log(this.ctx.store.state.auth)
      this.storage.setCookie('id_token', user.id_token, true);
    } catch (error) {
      console.error(error.message);
    }
  }
}