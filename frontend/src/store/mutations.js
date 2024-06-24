export default {
  setLoading: (state, isLoading) => {
    state.isLoading = isLoading
  },
  setClients: (state, data) => {
    state.clients = data.data
  },
  setClient: (state, data) => {
    state.client = data.data
  },
  setCategories: (state, data) => {
    state.categories = data.categories
  },
  setSubCategories: (state, data) => {
    state.subCategories = data.subCategories
  },
  setRocs: (state, data) => {
    state.rocs = data.rocs
  },
  setCompanyStatuses: (state, data) => {
    state.statuses = data.statuses
  },
  setCompanyClasses: (state, data) => {
    state.classes = data.classes
  },
  removeClient: (state, id) => {
    state.clients.clients = state.clients.clients.filter((client) => client._id !== id)
  },

  updateClient: (state, { id, ...data }) => {
    state.clients.client._source = data
    if (state.clients.clients.length) {
      // const otherClients = state.clients.clients.filter((client) => client._id !== id)
      // console.log(state.clients, 'cli')
      // const client = state.clients.clients.find((c) => c._id == id)
      // client._source = data
      // state.clients = [client, ...otherClients]
    }
  }
}
