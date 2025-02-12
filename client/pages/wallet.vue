
<template>
  <div class="container mx-auto p-8">
    <h1 class="text-2xl mb-4">Check Wallet Balance</h1>
    <SearchCard label="Wallet Address" @search="onSearch" />
  </div>
</template>

<script setup lang="ts">
import SearchCard from '@/components/SearchCard.vue'

function onSearch(query: string) {
  // TODO: Add integration with Stellar API to fetch wallet balance by address
  console.log('Searching for wallet address:', query)
}
</script>

<!-- pages/wallet.vue -->
<!-- <template>
  <div class="container mx-auto p-8">
    <h1 class="text-2xl mb-4">Check Wallet Balance</h1>
    <SearchCard label="Wallet Address" @search="onSearch" />
  </div>
</template>

<script setup lang="ts">
import SearchCard from '@/components/SearchCard.vue'

function onSearch(query: string) {
  // TODO: Add integration with Stellar API to fetch wallet balance by address
  console.log('Searching for wallet address:', query)
}
</script> -->
