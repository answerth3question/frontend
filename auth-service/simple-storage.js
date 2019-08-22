import { parse as parseCookie, serialize as serializeCookie} from 'cookie';

export default class SimpleStorage {
  vuexNamespace = 'auth'
  cookiePrefix = 'auth.'

  constructor(ctx) {
    this.ctx = ctx;
  }

  // Vuex state
  setState(key, val) {
    this.ctx.store.commit('auth/SET', [key, val]);
  }

  getState(key) {
    return this.ctx.store.state.auth[key];
  }

  removeState(key) {
    this.setState(key, null);
  }

  // Cookies
  setCookie(key, val, isSecure) {
    const serialized = serializeCookie(`auth.${key}`, val, {
      httpOnly: isSecure,
      secure: false,
      maxAge: 36e3,
    });
    if (process.client) {
      document.cookie = serialized;
    } else {
      const prevCookies = this.ctx.res.getHeader('Set-Cookie');
      this.ctx.res.setHeader('Set-Cookie', [prevCookies, serialized].filter(c => c));
    }
  }


  getCookie(key) {
    if (process.server && !this.ctx.req) {
      return;
    }
    const allTheCookies = process.client
      ? parseCookie(document.cookie || '')
      : parseCookie(this.ctx.req.headers.cookie || '');

    let myCookie = allTheCookies[`auth.${key}`];

    // console.log('my cookie in getCookie', myCookie)

    if (myCookie) {
      myCookie = decodeURIComponent(myCookie);
      if (myCookie !== 'undefined') {
        return myCookie;
      }
    }

    return undefined;
  }

  removeCookie(key, isSecure) {
    this.setCookie(key, undefined, isSecure);
  }

}