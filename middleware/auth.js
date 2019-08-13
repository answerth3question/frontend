// import jwt from 'jsonwebtoken';
import Auth from "../auth-service/auth";

const util = {
  routeOption(route, key, value) {
    return route.matched.some(m => {
      if (process.client) {
        return Object.values(m.components).some(c => c.options && c.options[key] === value)
      } else {
        return Object.values(m.components).some(c => {
          Object.values(c._Ctor).some(ctor => ctor.options && ctor.options[key] === value);
        });
      }
    });
  }
}

export default async function(ctx) {
  /** @type {Auth} */
  const auth = ctx.app.$auth; 

  auth.storage.removeUniversal('state');
  auth.storage.syncUniversal('id_token');
  let token = auth.storage.getUniversal('id_token');
  if (auth.isAtLogin) { // at the login page
    if (token && auth.isLoggedIn(token)) {
      ctx.app.router.push({ path: auth.redirect.home }); // go home if we're logged in already (kinda arbitrary...)
    }
  } else if (auth.isAtCallback) { // at the callback page
    if (token && auth.isLoggedIn(token)) {
      ctx.redirect('/')
      // ctx.app.router.push({ path: auth.redirect.home }); // go home if we're logged in already (kinda arbitrary...)
    } else {
      try {
        auth.storage.removeUniversal('id_token'); // clear the token if it exists because it has expired
        const result = await auth.fetchIdToken();
        auth.storage.setUniversal('id_token', result.id_token);
        // ctx.app.router.push({ path: auth.redirect.home });
        ctx.redirect('/')
      } catch (error) {
        console.error('ERROR GETTING ID_TOKEN', error)
      }
    }
  } else if (auth.isAtLogout) { // at the logout page
    auth.storage.removeUniversal('id_token');
    ctx.redirect('/')
  } else { // all other pages with auth middleware activated
    if (util.routeOption(ctx.route, 'auth', false)) {
      console.log('skipping auth middleware')
      return
    }
    if (!token || !auth.isLoggedIn(token)) {
      ctx.redirect(auth.redirect.login);
    }
  }

}