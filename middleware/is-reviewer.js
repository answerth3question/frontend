export default function({ store, redirect }) {
  if (!store.getters['auth/roles'].includes('reviewer')) {
    redirect('/access-denied');
  }
}