<!-- pages/block.vue
<template>
  <div>
    <SearchCard label="Block Number" @search="onSearch" />
  </div>
</template>

<script setup lang="ts">

function onSearch(query: string) {
  // TODO: Add integration with Stellar API to fetch block details by number
  console.log('Searching for block number:', query)
}
</script> -->


<!-- pages/block.vue -->
<template>
  <div class="container mx-auto p-8">
    <h1 class="text-2xl mb-4">Search Block</h1>
    <SearchCard label="Block Number" @search="onSearch" />
  </div>
</template>

<script setup lang="ts">
import SearchCard from '@/components/SearchCard.vue'

function onSearch(query: string) {
  // TODO: Add integration with Stellar API to fetch block details by number
  console.log('Searching for block number:', query)
}
</script>
