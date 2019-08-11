import cookie from 'cookie'

const util = {
  encodeValue(val) {
    if (typeof val === 'string') {
      return val;
    }
    return JSON.stringify(val);
  },
  decodeValue(val) {
    if (typeof val === 'string') {
      try {
        return JSON.parse(val)
      } catch (_) {};
    }
    return val;
  },
  isUnset(val) {
    return val === null || typeof val === 'undefined';
  }

}

export default class Storage {
  vuexNamespace = 'auth'
  prefix = {
    localStorage: 'auth.',
    cookie: 'auth.',
  }

  constructor(ctx) {
    this.ctx = ctx;
  }

  getUniversal(key) {
    return this.getState(key) || this.getLocalStorage(key) || this.getCookie(key);
  }
  setUniversal(key, val) {
    this.setState(key, val);
    this.setLocalStorage(key, val);
    this.setCookie(key, val);
  }
  syncUniversal(key, defaultValue) {
    let value = this.getUniversal(key);
    if (util.isUnset(value) && !util.isUnset(defaultValue)) {
      value = defaultValue;
    }
    if (!util.isUnset(value)) {
      this.setUniversal(key, value);
    }
    return value;
  }
  removeUniversal(key) {
    this.setState(key, undefined);
    this.setLocalStorage(key, undefined);
    this.setCookie(key, undefined);
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
    if (typeof localStorage !== 'undefined') {
      const _key = this.prefix.localStorage + key
      if (util.isUnset(val)) {
        return localStorage.removeItem(_key);
      }
      localStorage.setItem(_key, val);
    }
  }
  getLocalStorage(key) {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(this.prefix.localStorage + key);
    }
  }

  // Cookie
  setCookie(key, val) {
    const _value = util.encodeValue(val);
    const _key = this.prefix.cookie + key

    const serialized = cookie.serialize(_key, _value);
    if (process.client) {
      document.cookie = serialized;
    } else if (process.server && this.ctx.res) {
      const prevCookies = this.ctx.res.getHeader('Set-Cookie');
      this.ctx.res.setHeader('Set-Cookie', [].concat(prevCookies, serialized).filter(c => c));
    }

    return val;
  }
  getAllCookies() {
    const cookieStr = process.client
      ? document.cookie
      : this.ctx.req.headers.cookie;

    return cookie.parse(cookieStr || '') || {};
  }
  getCookie(key) {
    if (process.server && !this.ctx.req) {
      return;
    }

    const _key = this.prefix.cookie + key;
    const cookies = this.getAllCookies();
    const value = cookies[_key] ? decodeURIComponent(cookies[_key]) : undefined;

    return value === 'undefined' ? undefined : value;
  }
}