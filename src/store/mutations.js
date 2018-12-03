
import * as types from './mutation-type'

const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SET_RANKLIST](state, rankList) {
    state.rankList = rankList
  }
}
export default mutations