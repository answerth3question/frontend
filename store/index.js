export const actions = {
  async nuxtServerInit(vuexCtx, appCtx) {
    console.log('init ser ver')
    console.log(appCtx.req.headers.cookie)
  }
}