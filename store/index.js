
export const actions = {
  async nuxtServerInit(vuexCtx, appCtx) {
    const token = this.$auth.storage.getCookie('id_token')
    if (token) {
      vuexCtx.commit('auth/SET', ['id_token', token])
      this.$axios.setToken(token, 'Bearer');
      try {
        await vuexCtx.dispatch('user/FETCH_PROFILE');
      } catch (error) {
        console.error(error.message)
      }
    }
  }
}