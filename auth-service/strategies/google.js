import nanoid from 'nanoid'
import { encodeQuery } from './utils'


export default class GoogleOAuth2Service  {
  authorization_endpoint = 'https://accounts.google.com/o/oauth2/auth'
  scope = ['openid', 'profile', 'email']

  constructor(ctx, config) {
    this.ctx = ctx;
    this.redirect_uri = config.redirect_uri;
  }

  login(state) {
    const url = `${this.authorization_endpoint}?` +
      `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
      `response_type=code&` +
      `scope=${this.scope.reduce((acc, x, i, arr) => (i < arr.length - 1 ? acc + x + '%20' : acc + x), '')}&` +
      `redirect_uri=${this.redirect_uri}&` +
      `state=${state}&` +
      `nonce=${nanoid()}`;
    
    // localStorage.setItem('google.state', state);

    window.location = url;
  }

  async handleCallback() {
    // const prevState = localStorage.getItem('google.state');
    // const responseQuery = this.ctx.route.query;

    // if (prevState !== responseQuery.state) {
    //  return
    // }

    // localStorage.setItem('google.state', null);

    console.log('inside GoogleOAuth2Service.handleCallback',)

    console.log('ctx  ============================ ',this.ctx.app.$axios.$post)
    try {
      const user = await this.ctx.app.$axios.$post('/auth/google', encodeQuery({
        code: this.ctx.query.code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: this.redirect_uri,
      }));
      return user;
    } catch (error) {
      console.log('ERRRRRROR in Googe.handleCallback', error.message)
    }
    

    console.log('inside GoogleOAuth2Service.handleCallback', user)

    
  }

}
