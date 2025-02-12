<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen bg-gray-900">
    <Header />
    <Navbar />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import Navbar from '~/components/Navbar.vue'
import Header from '~/components/Header.vue'
</script>
