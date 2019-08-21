import Auth from "../auth-service/simple-auth";

export default function(ctx, inject) {
  const auth = new Auth(ctx);

  inject('auth', auth);
}