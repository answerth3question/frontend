
export default class Storage {
  vuexNamespace = 'auth'
  prefix = {
    localStorage: 'auth.',
    cookie: 'auth.',
  }

  constructor(ctx) {
    this.ctx = ctx;
  }

  // Vuex store
  setState(key, val) {
    this.ctx.store.commit('auth/SET', [key, val]);
  }
  getState(key) {
    return this.ctx.store.state.auth[key];
  }

  // Local storage
  setLocalStorage(key, val) {
    localStorage.setItem(this.prefix.localStorage + key, val);
  }
  getLocalStorage(key) {
    return localStorage.getItem(this.prefix.localStorage + key);
  }

  // Cookie
  setCookie(key, val) {
    console.log('[NOT IMPLEMENTED] setCookie')
  }
  getCookie(key) {
    console.log('[NOT IMPLEMENTED] getCookie')
  }
}