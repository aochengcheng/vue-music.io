import Vuex from 'vuex'
import Vue from 'vue'
import state from './state'
import mutations from './mutations'
import * as getters from './getters'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)



export default new Vuex.Store({
  state,
  mutations,
  getters,
  plugins: [createLogger()]
})