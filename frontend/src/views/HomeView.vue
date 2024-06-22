<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

const search = ref('')
const store = useStore()
onMounted(() => {
  store.dispatch('fetchCompanies')
})
const isLoading = computed(() => store.state.isLoading)
const clients = computed(() => store.getters.getClients)
console.log(clients, isLoading, 'store')
</script>

<template>
  <h2 class="text-center">Company Details Data Analysis</h2>
  <section class="d-flex flex-column align-items-center">
    <input name="search" class="form-control w-50" v-model="search" />
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Company Name</th>
          <th scope="col">RoC</th>
          <th scope="col">CIN</th>
          <th scope="col">Email</th>
          <th scope="col">Registration Date</th>
          <th scope="col">Category</th>
          <th scope="col">Sub Category</th>
          <th scope="col">Company Class</th>
        </tr>
      </thead>
      <tbody>
        <span v-if="isLoading"> Loading.... </span>
        <tr v-else>
          Data loaded
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped lang="scss"></style>
