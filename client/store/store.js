import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

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

const isDev = process.env.NODE_ENV === 'development'

export default () => {
  return new Vuex.Store({
    strict: isDev,
    state: defaultState,
    mutations,
    getters,
    actions
  })
}
