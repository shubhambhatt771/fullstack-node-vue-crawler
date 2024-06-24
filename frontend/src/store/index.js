import { createStore } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
const initialState = {
  clients: {
    clients: [],
    page: 1,
    count: 0
  },
  client: {
    _id: '',
    _source: {
      name: '',
      roc: '',
      status: '',
      cin: '',
      registrationDate: '',
      category: '',
      subCategory: '',
      class: '',
      authorisedCapital: '',
      paidUpCapital: '',
      state: '',
      pin: '',
      country: '',
      address: '',
      email: ''
    }
  },
  categories: [],
  subCategories: [],
  rocs: [],
  classes: [],
  statuses: []
}

export const store = createStore({
  state: initialState,
  actions,
  getters,
  mutations
})
