// import jwt from 'jsonwebtoken';
import Auth from "../auth-service/simple-auth";

const util = {
  routeOption(route, key, value) {
    return route.matched.some(m => {
      if (process.client) {
        return Object.values(m.components).some(c => c.options && c.options[key] === value)
      } else {
        return Object.values(m.components).some(c => (
          Object.values(c._Ctor).some(ctor => ctor.options && ctor.options[key] === value)
        ));
      }
    });
  }
}

export default async function(ctx) {
  /** @type {Auth} */
  const auth = ctx.app.$auth;


  if (process.server) { // on the server
    // cookie is truth
    const idToken = auth.storage.getCookie('id_token');

    if (auth.isAtCallback) {
      try {
        await auth.fetchUser();
        // persist token in cookie and vuex state
        // auth.storage.setState('id_token', user.id_token);
        // auth.storage.setCookie('id_token', user.id_token, true);
        ctx.redirect('/');
      } catch (error) {
        console.log(error.message);
      }
    } else if (!idToken && !util.routeOption(ctx.route, 'auth', false)) { // if theres no id_token and auth is required...
      console.log('You are not authorized to access this page!', ctx.req);
      ctx.redirect('/login');
    }
  } else { // on the client
    // vuex state is truth
    const idToken = auth.storage.getState('id_token');

    if (!idToken && !util.routeOption(ctx.route, 'auth', false)) { // if theres no id_token and auth is required...
      console.log('You are not authorized to access this page!');
      ctx.redirect('/login');
    }
  }
}

// export default async function(ctx) {
//   /** @type {Auth} */
//   const auth = ctx.app.$auth;

//   auth.storage.removeUniversal('state');
//   auth.storage.syncUniversal('id_token');
//   console.log(ctx.store.state.auth)
//   let token = auth.storage.getUniversal('id_token');

//   if (auth.isAtLogin) { // at the login page
//     if (token && auth.loggedIn(token)) {
//       ctx.app.router.push({ path: auth.redirect.home }); // go home if we're logged in already (kinda arbitrary...)
//     }
//   } else if (auth.isAtCallback) { // at the callback page
//     if (token && auth.loggedIn(token)) {
//       ctx.redirect('/')
//     } else {
//       try { // this only happens on the redirect from the login user authorization page because in all other refresh scenarios, the token can be retrieved from cookies
//         auth.storage.removeUniversal('id_token'); // clear the token if it exists because it has expired
//         const result = await auth.fetchIdToken();
//         auth.storage.setUniversal('id_token', result.id_token);
//         ctx.redirect('/')
//       } catch (error) {
//         console.error('ERROR GETTING ID_TOKEN', error)
//       }
//     }
//   } else if (auth.isAtLogout) { // at the logout page
//     auth.storage.removeUniversal('id_token');
//     ctx.app.$axios.setToken(false);
//     ctx.redirect('/')
//   } else { // all other pages with auth middleware activated
//     if (util.routeOption(ctx.route, 'auth', false)) {
//       console.log('skipping auth middleware')
//       return
//     }
//     if (!token || !auth.loggedIn()) {
//       console.log('redirection to /logout from', ctx.route.path, 'because auth.loggedIn =', auth.loggedIn())
//       ctx.redirect(auth.redirect.logout);
//     }
//   }

// }