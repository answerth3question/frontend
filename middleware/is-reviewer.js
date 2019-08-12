export default function({ store, redirect }) {
  if (store.getters['auth/role'] !== 'reviewer') {
    redirect('/access-denied');
  }
}