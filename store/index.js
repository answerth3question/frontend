
export const actions = {
  async nuxtServerInit(vuexCtx, appCtx) {
    const token = this.$auth.storage.getCookie('id_token')
    if (token) {
      vuexCtx.commit('auth/SET', ['id_token', token])
      this.$axios.setToken(token, 'Bearer');
      try {
        await vuexCtx.dispatch('user/FETCH')
      } catch (error) {
        console.error(error.message)
      }
    }
    try {
      // we need to await the result of these dispatches because 
      // we are in nuxtServerInit
      await Promise.all([
        vuexCtx.dispatch('posts/FETCH'),
        vuexCtx.dispatch('prompts/FETCH'),
      ]);
    } catch (error) {
      console.error(error.message)
    }
  }
}