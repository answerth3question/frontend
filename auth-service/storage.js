import cookie from 'cookie';

const isUnset = val => (val === null || typeof val === 'undefined');
const isSet = val => !isUnset(val);

export default class Storage {
  prefix = {
    localStorage: 'auth.',
    cookie: 'auth.',
    token: '_token.',
    refresh_token: '_refresh_token',
  };

  constructor(ctx) {
    this.ctx = ctx;
  }

  // Universal
  getUniversal(key) {
    let value = this.getState(key);
    if (isUnset(value)) {
      value = this.getCookie(key)
    }

    if (isUnset(value)) {
      value = this.getLocalStorage(key);
    }

    return value;
  }
  setUniversal(key, val) {
    if (isUnset(val)) {
      return this.removeUniversal(key);
    }
    this.setState(key, val);
    this.setCookie(key, val);
    this.setLocalStorage(key, val);

    return val;
  }
  syncUniversal(key, defaultVal) {
    let value = this.getUniversal(key);

    if (isUnset(value) && isSet(defaultVal)) {
      value = defaultVal;
    }

    if (isSet(value)) {
      this.setUniversal(value);
    }
    return value;
  }
  removeUniversal(key) {
    this.removeCookie(key);
    this.removeLocalStorage(key);
    this.removeState(key);
  }

  // Local Storage
  setLocalStorage(key, val) {
    if (typeof localStorage !== 'undefined' && process.client) {
      const _key = this.prefix.localStorage + key;
      localStorage.setItem(_key, JSON.stringify(val));
    }
  }
  getLocalStorage(key) {
    if (typeof localStorage !== 'undefined' && process.client) {
      const _key = this.prefix.localStorage + key
      return JSON.parse(localStorage.getItem(_key));
    }
  }
  removeLocalStorage(key) {
    if (typeof localStorage !== 'undefined') {
      const _key = this.prefix.localStorage + key;
      localStorage.removeItem(_key);
    }
  }

  // Vuex
  getState(key) {
    return this.ctx.store.state.auth[key];
  }
  setState(key, val) {
    this.ctx.store.commit('auth/SET', [key, val])
  }
  removeState(key) {
    this.setState(key, undefined);
  }

  // Cookie
  setCookie(key, val) {
    if (process.server && !this.ctx.res) {
      return;
    }

    const _key = this.prefix.cookie + key;
    const _value = typeof val === 'string' ? val : JSON.stringify(val);
    const _options = {};
    if (val === null || val === undefined) {
      _options.maxAge = -1;
    }

    if (typeof _options.expires === 'number') {
      _options.expires = new Date(new Date() * 1 + _options.expires * 86400000)
    }

    const serialized = cookie.serialize(_key, _value, _options);

    if (process.client) {
      document.cookie = serialized;
    } else if (process.server && this.ctx.res) {
      const prevCookies = this.ctx.res.getHeader('Set-Cookie');
      if (prevCookies) {
        this.ctx.res.setHeader('Set-Cookie', [].concat(prevCookies, serialized).filter(c => c));
      }
    }

    return val;
  }
  getCookies() {
    const cookieStr = process.client
      ? document.cookie
      : this.ctx.req.headers.cookie;

    return cookie.parse(cookieStr || '') || {};
  }
  getCookie(key) {
    if (process.server && !this.ctx.req) {
      console.log('RETURN EARLY FROM GET_COOKIE')
      return;
    }
    const _key = this.prefix.cookie + key;
    const cookies = this.getCookies();
    const value = cookies[_key] ? decodeURIComponent(cookies[_key]) : undefined;
    if (typeof value === 'string') {
      return JSON.parse(value);
    }
    return value;
  }
  removeCookie(key) {
    this.setCookie(key, undefined);
  }
}