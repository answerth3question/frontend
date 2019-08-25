export default function({ store, redirect }) {
  const userPermission = store.getters['auth/claims'].permission;
  if (!userPermission || !userPermission.includes('admin')) {
    redirect('/access-denied');
  }
}