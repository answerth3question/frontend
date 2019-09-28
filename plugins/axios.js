export default function({ store, $axios, app, req }) {
  $axios.setToken(store.state.auth.id_token, 'Bearer')
}