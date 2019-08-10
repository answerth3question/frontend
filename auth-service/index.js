import nanoid from 'nanoid'
import GoogleOAuth2Service  from './strategies/google'
import Storage from './storage'

export class Auth {
  selectedStrategy = null;

  redirect = {
    home: '/',
    callback: '/callback'
  };

  constructor(ctx, options) {
    this.ctx = ctx;
    this.storage = new Storage(ctx);
    this.strategies = {
      google: new GoogleOAuth2Service(ctx, { 
        redirect_uri: options.redirect_uri
      }),
    }
  }

  loginWith(strategyName) {
    const state = nanoid()
    if (!this.strategies[strategyName]) {
      console.error('No strategy registered for', strategyName);
      return;
    }
    this.storage.setUniversal('strategy', strategyName);
    this.storage.setUniversal('security_state', state);
    this.selectedStrategy = this.strategies[strategyName];
    this.selectedStrategy.login(state);
  }

  async handleCallback() {
    const strategy = this.storage.getUniversal('strategy');
    if (!this.strategies[strategy]) {
      console.error('No strategy registered for', strategy);
      return;
    }

    const prevState = this.storage.getUniversal('security_state');
    const responseState = this.ctx.query.state;

    if (prevState !== responseState) {
      return;
    }

    this.selectedStrategy = this.strategies[strategy];
    try {
      const user = await this.selectedStrategy.handleCallback();
      this.storage.setState('user', user);
      this.storage.setUniversal('_token', user.id_token);
    } catch (error) {
      console.error('error getting user', error.message)
    }
   
  }
  
}