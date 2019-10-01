import util from '@/util/index'

export const state = () => ({
  list: [],
})

export const getters = {
  byId(state) {
    return util.indexById(state.list);
  },
  byDate(state) {
    return util.sort(state.list).by('date_created')
  }
}