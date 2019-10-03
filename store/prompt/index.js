import helpers from '@/util/helpers'

export const state = () => ({
  errors: [],
  selectedId: '',
});

export const getters = {
  selected(state, getters) {
    const promptId = state.selectedId;

    const ret = {
      id: '',
      date_created: '',
      created_by: '',
      content: '',
      status: '',
      posts: [],
      reviews: [],
    }

    if (promptId) {
      let selected = null;

      if (getters['pending/byId'][promptId]) {
        selected = getters['pending/byId'][promptId];
      } else if (getters['approved/byId'][promptId]) {
        selected = getters['approved/byId'][promptId];
      }  else if (getters['rejected/byId'][promptId]) {
        selected = getters['rejected/byId'][promptId];
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
          ctx.dispatch('pending/FETCH', { withReviews: true }),
          ctx.dispatch('rejected/FETCH', { withReviews: true }),
          ctx.dispatch('approved/FETCH', { withReviews: true }),
        ]);
      } else {
        await ctx.dispatch('approved/FETCH');
      }
    } catch (error) {
       helpers.handleActionError(ctx, error);
    }
  },
};

