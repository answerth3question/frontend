import Auth from "../auth-service/authv2";

export default function(ctx, inject) {
  const auth = new Auth(ctx);

  inject('auth', auth);
}