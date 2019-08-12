export default function({ store, redirect }) {
  if (store.getters['auth/role'] !== 'admin') {
    redirect('/access-denied');
  }
}