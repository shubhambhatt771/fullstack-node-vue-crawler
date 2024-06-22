<script setup>
import { RouterView } from 'vue-router'
import AppLayout from './components/app-layout.vue'
import NavBar from './components/Nav-bar.vue'
import AppFooter from './components/app-footer.vue'
</script>

<template>
  <AppLayout>
    <template #header>
      <nav-bar></nav-bar>
    </template>
    <template #default>
      <RouterView />
    </template>

    <template #footer> <app-footer></app-footer> </template>
  </AppLayout>
</template>
