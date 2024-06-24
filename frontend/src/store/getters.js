export default {
  getClients: (state) => state.clients.clients,
  getPaginationInfo: (state) => {
    const pageSize = 20
    const count = state.clients.count
    let lastPage = Math.round(count / pageSize)
    lastPage = lastPage <= 0 ? 1 : lastPage
    return { count: state.clients.count, page: state.clients.page, lastPage }
  },
  getSingleClient: (state) => state.client,
  getCategories: (state) => state.categories.filter((cat) => cat.name !== ''),
  getSubCategories: (state) => state.subCategories.filter((sub) => sub.name !== ''),
  getRocs: (state) => state.rocs.filter((roc) => roc.name !== ''),
  getCompanyClasses: (state) => state.classes.filter((c_class) => c_class.name !== ''),
  getCompanyStatuses: (state) => state.statuses.filter((c_status) => c_status.name !== '')
}
