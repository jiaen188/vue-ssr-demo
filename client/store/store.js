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
  const store = new Vuex.Store({
    strict: isDev,
    state: defaultState,
    mutations,
    getters,
    actions,
    modules: {
      a: {
        namespaced: true, // 这个属性加上后，本来每个module的mutation会放到全局的mutation下，现在只能在单个mutation下
        state: {
          text: 1
        },
        mutations: {
          updateText (state, text) {
            console.log('a.state', state)
            state.text = text
          }
        },
        getters: {
          textPlus (state, getters, rootState) {
            console.log('在模块a中拿到全局的state', rootState)
            return state.text + 1
          }
        },
        actions: {
          add ({state, commit, rootState}) {
            commit('updateText', rootState.count)
          }
        }
      },
      b: {
        state: {
          text: 2
        }
      }
    }
  })

  // 加入热更新功能
  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './getters/getters',
      './actions/actions'
    ], () => {
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newActions = require('./actions/actions').default
      const newGetters = require('./getters/getters').default

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }

  return store
}
