
export default {
  handleActionError(ctx, error) {
    try {
      ctx.commit('SET', ['errors', [...ctx.state.errors, error.message]]);
    } catch (error) {
      console.error('[util - handleActionError', error.message);
    }
  },
  sort(items) {
    return {
      by(key) {
        return {
          desc: () => items.slice().sort((a, b) => a[key] > b[key] ? 1 : -1),
          asc: () => items.slice().sort((a, b) => a[key] > b[key] ? -1 : 1),
        }
      }
    }
  },
  queryStringify(obj) {
    const qs = Object.entries(obj)
      .filter(([key, val]) => !!val && val !== undefined)
      .map(([key, val]) => {
        const primitives = ['string', 'number', 'boolean'];
        if (Array.isArray(val)) {
          return key + '=' + val.join(',');
        } else if (primitives.includes(typeof val)) {
          return key + '=' + val;
        } else {
          throw new Error('[helpers error] Values in object passed to queryStringify can only be stirng')
        }
      })
      .join('&');
    return '?' + qs;
  },
  indexById(accum = {}, items = []) {
    items.forEach(item => accum[item.id] = item);
  },
  
}
