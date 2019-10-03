export default function({ store, redirect }) {
  if (!store.getters['auth/permission'].includes('admin')) {
    redirect('/access-denied');
  }
}