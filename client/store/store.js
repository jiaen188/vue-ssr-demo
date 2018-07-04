import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'

// 不在这里 export 同一个对象，原因和router相同，防止内存泄露
/* const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    updateCount (state, num) {
      state.count = num
    }
  }
}) */

export default () => {
  return new Vuex.Store({
    state: defaultState,
    mutations,
    getters
  })
}
