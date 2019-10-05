import helpers from '@/util/helpers'

const createState = () => () => ({
  items: {},
  errors: [],
  busy: false,
  success: false,
});

const createMutations = () => ({
  SET(state, [key, val]) {
    if (state[key] !== undefined) {
      state[key] = val;
    }
  },
  UPSERT_ITEMS(state, items) {
    helpers.indexById(state.items, items);
  },
});

const createActions = ({ promptEndpoint = '' }) => ({
  async FETCH(ctx, { limit = 20, sort_order = 'desc', cursor = '' } = {}) {
    const query = helpers.queryStringify({ limit, sort_order, cursor });
    try {
      ctx.commit('SET', ['busy', true]);
      const items = await this.$axios.$get('/api/prompt/' + promptEndpoint + query);
      ctx.commit('UPSERT_ITEMS', items);
      ctx.commit('SET', ['success', true]);
    } catch (error) {
      helpers.handleActionError(ctx, error);
    } finally {
      ctx.commit('SET', ['busy', false]);
    }
  }
});

const createGetters = () => ({
  itemsByDate(state) {
    const items = Object.values(state.items);
    return helpers.sort(items)
      .by('date_created')
      .desc();
  }
});

export default { createState, createActions, createMutations, createGetters }