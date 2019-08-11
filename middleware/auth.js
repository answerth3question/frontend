import jwt from 'jsonwebtoken';
import Auth from "../auth-service/authv2";

export default async function(ctx) {
  /** @type {Auth} */
  const auth = ctx.app.$auth;
  auth.storage.removeUniversal('state');
  auth.storage.syncUniversal('id_token');
  let token = auth.storage.getUniversal('id_token');
  // if (token) {
  //   token = jwt.decode(token);
  // }
  if (auth.isAtLogin) { // at the login page
    if (token && auth.isLoggedIn(token)) {
      ctx.app.router.push({ path: auth.redirect.home }); // go home if we're logged in already (kinda arbitrary...)
    }
  } else if (auth.isAtCallback) { // at the callback page
    if (token && auth.isLoggedIn(token)) {
      ctx.app.router.push({ path: auth.redirect.home }); // go home if we're logged in already (kinda arbitrary...)
    } else {
      try {
        auth.storage.removeUniversal('id_token'); // clear the token if it exists because it has expired
        const result = await auth.fetchIdToken();
        auth.storage.setUniversal('id_token', result.id_token);
        ctx.redirect(auth.redirect.home);
      } catch (error) {
        console.error('ERROR GETTING ID_TOKEN', error)
      }
    }
  } else if (auth.isAtLogout) { // at the logout page
    auth.storage.removeUniversal('id_token');
    ctx.redirect('/');
  } else { // all other pages with auth middleware activated
    if (!token || !auth.isLoggedIn(token)) {
      ctx.redirect(auth.redirect.login);
    }
  }

}