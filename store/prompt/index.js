import helpers from '@/util/helpers'

export const state = () => ({
  errors: [],
  selectedId: '',
});

export const getters = {
  selected(state, getters) {
    const id = state.selectedId;

    const ret = {
      id: '',
      date_created: '',
      created_by: '',
      content: '',
      status: '',
      posts: [],
      reviews: [],
    }

    if (id) {
      let selected = null;

      if (state.approved.items[id]) {
        selected = state.approved.items[id];
      } else if (state.pending.items[id]) {
        selected = state.pending.items[id];
      } else if (state.rejected.items[id]) {
        selected = state.rejected.items[id];
      }
      
      if (selected) {
        ret.id = selected.id;
        ret.date_created = selected.date_created;
        ret.created_by = selected.created_by;
        ret.content = selected.content;
        ret.status = selected.status;
        ret.posts = selected.posts;
        ret.reviews = selected.reviews;
      }

      return ret;
    }
    return ret;
  }
}


export const mutations = {
  SET(state, [key, val]) {
    if (state[key] !== undefined) {
      state[key] = val;
    }
  },
};


export const actions = {
  async FETCH_AUTHORIZED(ctx) {
    try {
      const perms = ctx.rootGetters['auth/permission'];
      if (perms && perms.includes('reviewer')) {
        await Promise.all([
          ctx.dispatch('pending/FETCH'),
          ctx.dispatch('rejected/FETCH'),
          ctx.dispatch('approved/FETCH'),
        ]);
      } else {
        await ctx.dispatch('approved/FETCH');
      }
    } catch (error) {
       helpers.handleActionError(ctx, error);
    }
  },
};

