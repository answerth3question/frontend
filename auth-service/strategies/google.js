import nanoid from 'nanoid'
import { encodeQuery } from './utils'


export default class GoogleOAuth2Service  {
  authorizationEndpoint = 'https://accounts.google.com/o/oauth2/auth'

  scope = ['openid', 'profile', 'email']

  constructor({ redirectUri }) {
    this.redirectUri = redirectUri;
  }

  login(state) {
    const url = `${this.authorizationEndpoint}?` +
      `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
      `response_type=code&` +
      `scope=${this.scope.reduce((acc, x, i, arr) => (i < arr.length - 1 ? acc + x + '%20' : acc + x), '')}&` +
      `redirect_uri=${this.redirectUri}&` +
      `state=${state}&` +
      `nonce=${nanoid()}`;
    
    window.location = url;
  }

  /**
   * 
   * @returns {Promise} 
   */
  fetchIdToken(ctx) {
    return ctx.app.$axios.$post('/auth/google', encodeQuery({
      code: ctx.query.code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: this.redirectUri,
    }));
  }
}
