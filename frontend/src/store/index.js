import { createStore } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
const initialState = {
  clients: [],
  client: {}
}

export const store = createStore({
  state: initialState,
  actions,
  getters,
  mutations
})
