export default function({ store, redirect }) {
  if (!store.getters['auth/roles'].includes('admin')) {
    redirect('/access-denied');
  }
}