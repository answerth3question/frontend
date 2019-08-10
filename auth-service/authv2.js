import Storage from './storagev2';

export default class Auth {
  redirect = {
    login: '/login',
    callback: '/callback',
    home: '/',
    logout: '/',
  }

  constructor(ctx) {
    this.ctx = ctx;
    this.storage = new Storage(ctx);
  }

  
}