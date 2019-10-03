import util from '@/util/index'

export const state = () => ({
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

export const mutations = {
  SET(state, [key, val]) {
    if (state[key] !== undefined) {
      state[key] = val;
    }
  },
  PUSH_ITEMS(state, items) {
    state.items.push(items);
  },
  SET_PAGINATION(state, p) {
    state.pagination.page = p.page;
    state.pagination.per_page = p.per_page;
    state.pagination.has_next = p.has_next;
  }
}

export const actions = {
  async FETCH(ctx) {
    try {
      commit('SET', ['busy', true]);
      const { getters, state, commit } = ctx;
      const query = `?page=${getters.nextPage}&per_page=${state.pagination.per_page}`;
      const { items, ...pagination } = await this.$axios.$get('/api/prompt/pending' + query);
      commit('PUSH_ITEMS', items);
      commit('SET_PAGINATION', pagination);
      commit('SET', ['success', true]);
    } catch (error) {
      util.handleActionError(ctx, error);
    } finally {
      commit('SET', ['busy', true]);
    }
  }
}

export const getters = {
  nextPage(state) {
    if (state.pagination.page === 0 || state.pagination.has_next) {
      return state.pagination.page + 1;
    }
    return null;
  },
  itemsById(state) {
    return util.indexById(state.items);
  },
  itemsByDate(state) {
    return util.sort(state.items).by('date_created')
  }
}