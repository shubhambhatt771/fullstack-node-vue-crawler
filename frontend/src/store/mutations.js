export default {
  setLoading: (state, isLoading) => {
    state.isLoading = isLoading
  },
  setClients: (state, data) => {
    console.log('inside mutations data', data)
    state.clients = data
  }
}
