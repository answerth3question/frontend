
export function handleActionError(ctx, error) {
  try {
    ctx.commit('SET', ['errors', [...ctx.state.errors, error.message]]);
  } catch (error) {
    console.error('[util - handleActionError', error.message);
  }
}

export function indexById(items) {
  try {
    return items.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {});
  } catch (error) {
    console.error('[util - indexById', error.message);
  }
}