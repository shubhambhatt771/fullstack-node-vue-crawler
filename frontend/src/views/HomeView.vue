<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import Swal from 'sweetalert2';
const search = ref('')
const store = useStore()
onMounted(() => {
  store.dispatch('fetchCompanies', { q: '', pageNumber: 0 });
  store.dispatch('fetchCategories');
  store.dispatch('fetchSubCategories');
  store.dispatch('fetchRocs');
  store.dispatch('fetchCompanyStatuses');
  store.dispatch('fetchCompanyClasses');
})
const isLoading = computed(() => store.state.isLoading)
const clients = computed(() => store.getters.getClients)
const paginationInfo = computed(() => store.getters.getPaginationInfo);
const isFirstPage = ref(true);
const isLastPage = ref(false);
const pages = ref([1, 2, 3, 4]);
const currentPage = ref(1);

watch(() => paginationInfo.value, (newV) => {
  const { page, lastPage } = newV;
  isFirstPage.value = page === 1 ? true : false;
  isLastPage.value = page === lastPage ? true : false;
  currentPage.value = page;
  let start = page + 9 >= lastPage ? lastPage - 9 : page;
  start = start < 0 ? 1 : start;
  let pagesArray = [];
  for (let i = 1; i <= 10 && start <= lastPage; i++) {
    pagesArray.push(start);
    start++;
  }
  pages.value = pagesArray;
});


const showConfirmDelete = (client) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      store.dispatch('deleteClient', client._id).then(() => {
        Swal.fire({
          title: "Deleted!",
          text: `${client._source.name} has been deleted.`,
          icon: "success"
        });
      })
    }
  });
}

watch(() => search.value, (newVal) => {
  if (newVal.length === 0) {
    searchClients();
  }
});

const searchClients = (pageNumber = 0) => {
  store.dispatch('fetchCompanies', { q: search.value, pageNumber });
}
</script>

<template>
  <h2 class="text-center">Company Details Data Analysis</h2>
  <section class="d-flex flex-column align-items-center">
    <div class="input-group my-3 w-50">
      <input name="search" placeholder="Search CIN/PIN/EMAIL/NAME" class="form-control" v-model="search" />
      <button @click="searchClients(pageNumber = 0)" type="button" class="btn btn-primary">Search</button>
    </div>

    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Company Name</th>
          <th scope="col">RoC</th>
          <th scope="col">CIN</th>
          <th scope="col">Email</th>
          <th scope="col">Registration Date</th>
          <th scope="col">Category</th>
          <th scope="col">Company Class</th>
          <th>
            <RouterLink to="/company/add" class="btn btn-primary" name="add-btn">Add</RouterLink>
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="isLoading">
          <tr>
            <td colspan="5"> Loading....</td>
          </tr>
        </template>
        <template v-else>

          <tr v-for="(client, i) in clients" :key="i">
            <td scope="row">{{ client._source.name }}</td>
            <td>{{ client._source.roc }}</td>
            <td>{{ client._source.cin }}</td>
            <td>{{ client._source.email }}</td>
            <td>{{ client._source.registrationDate }}</td>
            <td>{{ client._source.category }}</td>
            <td>{{ client._source.class }}</td>
            <td>
              <span class="d-block actions-cell">
                <RouterLink :to="{ name: 'viewCompany', params: { id: client._id } }">
                  <i class="fa text-primary fa-eye me-2" />
                </RouterLink>
                <RouterLink :to="{ name: 'editCompany', params: { id: client._id } }">
                  <i class="fa text-link fa-edit me-2" />
                </RouterLink>
                <i @click="showConfirmDelete(client)" class="fa text-danger fa-trash" />
              </span>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <div>
      <tr>
        <ul class="pagination justify-content-center">
          <li :class="['page-item', isFirstPage ? 'disabled' : '']">
            <a @click="searchClients(currentPage - 1)" class="page-link" href="#" tabindex="-1"
              aria-disabled="true">Previous</a>
          </li>

          <li v-for="page in pages" :key="page" @click="searchClients(page)"
            :class="['page-item', page === currentPage ? 'bg-primary text-white' : '']"><a class="page-link" href="#">{{
              page
            }}</a></li>
          <li :class="['page-item', isLastPage ? 'disabled' : '']">
            <a @click="searchClients(currentPage + 1)" class="page-link" href="#">Next</a>
          </li>
        </ul>
      </tr>
    </div>
  </section>
</template>

<style scoped lang="scss">
.actions-cell {
  cursor: pointer;

}

table tbody tr td:last-of-type {
  min-width: 100px;
}
</style>
