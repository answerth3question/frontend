
export const actions = {
  async nuxtServerInit(vuexCtx, appCtx) {
    const token = this.$auth.storage.getCookie('id_token')
    if (token) {
      vuexCtx.commit('auth/SET', ['id_token', token])
      this.$axios.setToken(token, 'Bearer');
      try {
        const user = await this.$axios.$get(`/api/user`);
        vuexCtx.commit('auth/SET', ['user', user]);
      } catch (error) {
        console.error(error.message)
      }
    }
  }
}