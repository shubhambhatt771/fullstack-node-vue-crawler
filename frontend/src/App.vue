<script setup>
import { RouterView } from 'vue-router'
import AppLayout from './components/app-layout.vue'
import NavBar from './components/Nav-bar.vue'
</script>

<template>
  <AppLayout>
    <template #header>
      <nav-bar></nav-bar>
    </template>
    <template #default>
      <RouterView />
    </template>

  </AppLayout>
</template>
