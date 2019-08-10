export default function(ctx) {
  const loginCallback = ctx.app.$auth.redirect.callback;
  const currentPath = ctx.route.fullPath;
  console.log('Inside the auth middleware', loginCallback, currentPath);

  if (currentPath.startsWith(loginCallback)) {
    ctx.app.$auth.handleCallback();
  }

}