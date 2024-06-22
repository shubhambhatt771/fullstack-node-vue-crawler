export default {
  fetchCompanies: ({ commit }, query) => {
    commit('setLoading', true)
    console.log('inside fetch companies', query)
    new Promise((res) => {
      new Promise((res) => {
        const data = [
          {
            company: 'Apple',
            cin: '123456789'
          }
        ]
        setTimeout(() => {
          res(data)
        }, 2000)
      }).then((result) => {
        console.log(result, 'result')
        commit('setClients', result)
        commit('setLoading', false)

        res()
      })
    })
  }
}
