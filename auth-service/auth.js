
import nanoid from 'nanoid'
import Storage from './storage';
import GoogleOAuth from './strategies/google'


export default class Auth {
  redirect = {
    home: '/',
    login: '/login',
    callback: '/callback',
    logout: '/logout',
  }

  strategy = 'google';

  constructor(ctx) {
    this.ctx = ctx;
    this.storage = new Storage(ctx);
    /**
     * @type {Object<string, GoogleOAuth>}
     */
    this.strategies = {
      google: new GoogleOAuth({
        redirectUri: 'http://localhost:3000' + this.redirect.callback,
      })
    }
  }

  get isAtLogin() { return this.ctx.route.path === this.redirect.login };
  get isAtLogout() { return this.ctx.route.path === this.redirect.logout };
  get isAtCallback() { return this.ctx.route.path === this.redirect.callback };

  loggedIn(token) {
    return this.ctx.store.getters['auth/loggedIn'](token);
  }

  fetchIdToken() {
    const prevState = this.storage.getUniversal('state');
    if (prevState !== this.ctx.query.state) {
      return;
    }
    this.storage.removeUniversal('state');
    return this.strategies[this.strategy].fetchIdToken(this.ctx);
  }

  login(strategyName) {
    if (strategyName && this.strategies[strategyName]) {
      this.strategy = strategyName;
    }
    const state = nanoid();
    this.storage.setUniversal('state', state);
    this.strategies[this.strategy].login(state);
  }

}