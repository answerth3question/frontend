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

  get isAtHome() { return this.ctx.route.path === this.redirect.home };
  get isAtLogin() { return this.ctx.route.path === this.redirect.login };
  get isAtLogout() { return this.ctx.route.path === this.redirect.logout };
  get isAtCallback() { return this.ctx.route.path === this.redirect.callback };

  loggedIn() {
    const token = process.client
      ? this.storage.getState('id_token')
      : this.storage.getCookie('id_token');
    // console.log('there is a token in process:', process.server ? 'server' : 'client', !!token)
    const decodedToken = jwt.decode(token);
    if (decodedToken) {
      return Date.now() / 1000 < decodedToken.exp;
    }
  }

  logout() {
    this.storage.removeCookie('id_token', true);
    this.storage.removeState('id_token');
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
    if (prevState !== this.ctx.query.state) {
      return;
    }
    try {
      const user = await strategies[this.strategy].userInfo(this.ctx, this.redirectUri);
      this.storage.setCookie('id_token', user.id_token, true);
    } catch (error) {
      console.error(error.message);
    }
  }
}