<!-- pages/transaction.vue
<template>
  <div class="container mx-auto p-8">
    <h1 class="text-2xl mb-4">Search Transaction</h1>
    <SearchCard label="Transaction Hash" @search="onSearch" />
  </div>
</template>

<script setup lang="ts">


function onSearch(query: string) {
  // TODO: Add integration with Stellar API to fetch transaction details by hash
  console.log('Searching for transaction hash:', query)
}
</script> -->

<!-- pages/transaction.vue -->
<template>
  <div class="container mx-auto p-8">
    <h1 class="text-2xl mb-4">Search Transaction</h1>
    <SearchCard label="Transaction Hash" @search="onSearch" />
  </div>
</template>

<script setup lang="ts">
import SearchCard from '@/components/SearchCard.vue'

function onSearch(query: string) {
  // TODO: Add integration with Stellar API to fetch transaction details by hash
  console.log('Searching for transaction hash:', query)
}
</script>

