import axios from 'axios'

const BASE_URL = import.meta.env.VITE_SERVER_URL
export default {
  fetchCompanies: ({ commit }, { q, pageNumber }) => {
    commit('setLoading', true)
    console.log('inside fetch companies', { q, pageNumber })
    new Promise((res) => {
      let query = q || pageNumber ? '?' : ''
      query += q ? `q=${q}` : ''
      query += pageNumber && pageNumber !== 0 ? `&page=${pageNumber}` : ''
      let url = BASE_URL + '/clients' + query
      console.log(url, 'url')
      axios
        .get(url)
        .then((res) => res.data)
        .then((result) => {
          commit('setClients', result)
          commit('setLoading', false)
          res()
        })
      console.log(url, 'endpoint')
    })
  },

  fetchSingleClient: ({ commit, state }, id) => {
    let url = BASE_URL + '/clients/' + id

    if (state.client?._id) {
      return
    }
    axios
      .get(url)
      .then((res) => res.data)
      .then((data) => {
        commit('setClient', data)
      })
  },

  fetchCategories: async ({ commit }) => {
    console.log('inside fetch categories')
    let url = BASE_URL + '/clients/' + 'categories'
    console.log(url, 'url')
    axios
      .get(url)
      .then((res) => res.data)
      .then((data) => {
        commit('setCategories', data)
      })
  },

  fetchSubCategories: async ({ commit }) => {
    let url = BASE_URL + '/clients/' + 'sub-categories'
    axios
      .get(url)
      .then((res) => res.data)
      .then((data) => {
        commit('setSubCategories', data)
      })
  },

  fetchRocs: async ({ commit }) => {
    let url = BASE_URL + '/clients/' + 'rocs'
    axios
      .get(url)
      .then((res) => res.data)
      .then((data) => {
        commit('setRocs', data)
      })
  },

  fetchCompanyStatuses: async ({ commit }) => {
    let url = BASE_URL + '/clients/' + 'status'
    axios
      .get(url)
      .then((res) => res.data)
      .then((data) => {
        commit('setCompanyStatuses', data)
      })
  },

  fetchCompanyClasses: async ({ commit }) => {
    let url = BASE_URL + '/clients/' + 'class'
    axios
      .get(url)
      .then((res) => res.data)
      .then((data) => {
        commit('setCompanyClasses', data)
      })
  },

  addClient: async ({ commit }, data) => {
    let url = BASE_URL + '/clients'
    await axios
      .post(url, data)
      .then((res) => res)
      .then((res) => console.log(res, 'api res'))
  },

  updateClient: async ({ commit }, { id, ...data }) => {
    let url = BASE_URL + '/clients/' + id
    await axios.put(url, data).then(() => commit('updateClient', { id, ...data }))
  },

  deleteClient: ({ commit }, id) => {
    let url = BASE_URL + '/clients/' + id
    axios.delete(url).then(() => {
      commit('removeClient', id)
    })
  }
}
