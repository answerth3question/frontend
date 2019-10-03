export default function({ store, redirect }) {
  if (!store.getters['auth/permission'].includes('reviewer')) {
    redirect('/access-denied');
  }
}