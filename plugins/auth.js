import { Auth } from "../auth-service";

export default function(ctx, inject) {
  const auth = new Auth(ctx, { 
    redirect_uri: 'http://localhost:3000/callback',
  });

  inject('auth', auth);
}