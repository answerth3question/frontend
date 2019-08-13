export default function({ store, $axios, app }) {
  $axios.onRequest(config => {
    if (process.client) {
      if (store.getters['auth/loggedIn']()) {
        config.headers.common['Authorization'] = `Bearer ${store.state.auth.id_token}`;
      }
    } else {
      const token = app.$auth.storage.getCookie('id_token');
      console.log('NO AUTHORIZATION TOKEN SET FOR AXIOS')
    }
    
  })
}