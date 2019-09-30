import { handleActionError, indexById } from '@/util/index'

export const state = () => ({
  errors: [],
  pending: {},
  rejected: {},
  approved: {},
  selectedId: '',
});

export const getters = {
  selected(state) {
    const promptId = state.selectedId;
    if (promptId) {
      const ret = {
        id: '',
        date_created: '',
        created_by: '',
        content: '',
        status: '',
        posts: [],
        reviews: [],
      }

      let selected = null;

      if (state.approved[promptId]) selected = state.approved[promptId];
      else if (state.pending[promptId]) selected = state.pending[promptId];
      else if (state.rejected[promptId]) selected = state.rejected[promptId];
      
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
    return null;
  }
}


export const mutations = {
  SET(state, [key, val]) {
    if (state[key] !== undefined) {
      state[key] = val;
    }
  },
  SET_ALL(state, prompts) {
    console.log(indexById(prompts.pending))
    state.pending = indexById(prompts.pending);
    state.rejected = indexById(prompts.rejected);
    state.approved = indexById(prompts.approved);
  },
  SET_APPROVED(state, approvedPrompts) {
    state.approved = indexById(approvedPrompts);
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
      handleActionError(ctx, error);
    }
  },
};

