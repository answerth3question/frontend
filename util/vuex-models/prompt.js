import helpers from '@/util/helpers'


const createState = () => () => ({
  items: [],
  errors: [],
  busy: false,
  success: false,
  pagination: {
    page: 0,
    per_page: 20,
    has_next: null,
  }
});

const createMutations = () => ({
  SET(state, [key, val]) {
    if (state[key] !== undefined) {
      state[key] = val;
    }
  },
  PUSH_ITEMS(state, items) {
    state.items.push(...items);
  },
  SET_PAGINATION(state, p) {
    state.pagination.page = p.page;
    state.pagination.per_page = p.per_page;
    state.pagination.has_next = p.has_next;
  }
});

const createActions = ({ promptEndpoint = '' }) => ({
  async FETCH(ctx, { withReviews = false }) {
    const { getters, state, commit, rootGetters } = ctx;
    try {
      commit('SET', ['busy', true]);
      const query = `?page=${getters.nextPage}&per_page=${state.pagination.per_page}&with_reviews=${withReviews}`;
      const { items, ...pagination } = await this.$axios.$get(`/api/prompt/${promptEndpoint}` + query);
      commit('PUSH_ITEMS', items);
      commit('SET_PAGINATION', pagination);
      commit('SET', ['success', true]);
    } catch (error) {
      helpers.handleActionError(ctx, error);
    } finally {
      commit('SET', ['busy', true]);
    }
  }
});

const createGetters = () => ({
  nextPage(state) {
    if (state.pagination.page === 0 || state.pagination.has_next) {
      return state.pagination.page + 1;
    }
    return null;
  },
  itemsById(state) {
    return helpers.indexById(state.items);
  },
  itemsByDate(state) {
    return helpers.sort(state.items).by('date_created')
  }
});

export default { createState, createActions, createMutations, createGetters }