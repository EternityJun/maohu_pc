import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// 数据贮存
let state = {
  title: '项目列表',
  user_id: '',
  user_name: '',
  zz_search_query: {},
  gs_search_query: {}
}
// 数据改变方法
let mutations = {
  setzzSearchValue (state, query) {
    // 变更状态
    state.zz_search_query = query
  },
  setGsSearchValue (state, query) {
    // 变更状态
    state.gs_search_query = query
  }
}
export default new Vuex.Store({
  state,
  mutations
})
