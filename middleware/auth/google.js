import nanoid from 'nanoid'

function encodeQuery(queryObject) {
  return Object.entries(queryObject)
  .filter(([key, value]) => typeof value !== 'undefined')
  .map(([key, value]) => encodeURIComponent(key) + (value != null ? '=' + encodeURIComponent(value) : ''))
  .join('&')
}


class GoogleOAuth2Service {
  authorization_endpoint = 'https://accounts.google.com/o/oauth2/auth'
  userinfo_endpoint = 'https://www.googleapis.com/oauth2/v3/userinfo'
  scope = ['openid', 'profile', 'email']

  constructor(config) {
    this.redirect_uri = config.redirect_uri;
  }

  login() {
    const state = nanoid()
    const url = `${this.authorization_endpoint}?` +
      `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
      `response_type=code&` +
      `scope=${this.scope.reduce((acc, x, i, arr) =>(i < arr.length - 1 ? acc + x + '%20' : acc + x), '')}&` +
      `redirect_uri=${this.redirect_uri}&` +
      `state=${state}&` +
      `nonce=${nanoid()}`;
    
    localStorage.setItem('google.state', state);

    window.location = url;
  }

  async handleCallback({ route, $axios, store }) {
    const prevState = localStorage.getItem('google.state');
    const responseQuery = route.query;

    if (prevState !== responseQuery.state) {
     return
    }

    localStorage.setItem('google.state', null);
    
    const user = await $axios.$post('/auth/google', encodeQuery({
      code: responseQuery.code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: this.redirect_uri,
    }));

    store.commit('auth/SET', ['user', user]);
    
  }

}


export const googleAuth = new GoogleOAuth2Service({
  redirect_uri: 'http://localhost:3000/callback'
});