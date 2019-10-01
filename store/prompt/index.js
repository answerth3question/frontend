import utils from '@/util/index'

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
  SET_ALL(state, prompts) {
    state.pending.list = prompts.pending;
    state.rejected.list = prompts.rejected;
    state.approved.list = prompts.approved;
  },
  SET_APPROVED(state, approvedPrompts) {
    state.approved.list = approvedPrompts;
  },
};


export const actions = {
  async FETCH(ctx) {
    try {
      const perms = ctx.rootGetters['auth/permission'];
      if (perms && perms.includes('reviewer')) {
        const prompts = await this.$axios.$get('/api/prompt/all')
        ctx.commit('SET_ALL', prompts);
      } else {
        ctx.commit('SET_APPROVED', await this.$axios.$get('/api/prompt/approved'));
      }
    } catch (error) {
       util.handleActionError(ctx, error);
    }
  },
};

