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
    // if (process.server) {
    const serialized = serializeCookie(`auth.${key}`, val, {
      httpOnly: isSecure,
      secure: isSecure,
      maxAge: 36e3,
    });
    if (process.client) {
      document.cookie = serialized;
    } else {
      const prevCookies = this.ctx.res.getHeader('Set-Cookie');
      this.ctx.res.setHeader('Set-Cookie', [prevCookies, serialized].filter(c => c));
    }
  }
  // setCookie(key, val) {
  //   const serialized = cookie.serialize(`auth.${key}`, val, {
  //     httpOnly: true,
  //     secure: true,
  //   });
  //   if (process.client) {
  //     document.cookie = serialized;
  //   } else {
  //     const prevCookies = this.ctx.res.getHeader('Set-Cookie');
  //     this.ctx.res.setHeader('Set-Cookie', [prevCookies, serialized]);
  //   }
  //   return val;
  // }

  getCookie(key) {
    if (process.server && !this.ctx.req) {
      return;
    }
    const allTheCookies = process.client
      ? parseCookie(document.cookie || '')
      : parseCookie(this.ctx.req.headers.cookie || '');

    let myCookie = allTheCookies[`auth.${key}`];

    if (myCookie) {
      myCookie = decodeURIComponent(myCookie);
      if (myCookie !== 'undefined') {
        return myCookie;
      }
    }

    return undefined;
  }

  // getCookie(key) {
  //   if (process.server && !this.ctx.req) {
  //     return
  //   }
  //   const cookieStr = process.client
  //     ? document.cookie
  //     : this.ctx.req.cookie;
  //   const cookies = cookie.parse(cookieStr || '') || {};

  //   let ret = cookies[`auth.${key}`] ? decodeURIComponent(cookies[`auth.${key}`]) : null;
  //   ret = ret === 'null' ? null : ret; // if ret is a string that says 'null', set it to real null
  //   return ret;
  // }

  removeCookie(key) {
    this.setCookie(key, undefined);
  }

}