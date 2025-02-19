<template>
  <div class="container mx-auto p-8">
    <h1 class="text-2xl font-bold text-white mb-6">Search Ledger</h1>
    
    <SearchCard
      label="Ledger Sequence or Hash"
      placeholder="Enter the ledger sequence number or hash"
      :pending="pending"
      @search="onSearch"
      v-model="passedLedger"
    />

    <!-- Error State -->
    <div v-if="error" class="mt-6">
      <Alert variant="destructive">
        <Icon name="lucide:alert-circle" class="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{{ error }}</AlertDescription>
      </Alert>
    </div>

    <!-- Ledger Details -->
    <div v-if="ledger" class="mt-6">
      <LedgerDetails :ledger="ledger" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLedgerService } from '@/features/ledger/service'
import type { Ledger } from '@/features/ledger/model'

const { getLedgerById } = useLedgerService()
const ledger = ref<Ledger | null>(null)
const error = ref<string | null>(null)
const pending = ref(false)

const internalLedger = ref(history.state?.ledger || '');
const passedLedger = computed({
  get: () => internalLedger.value,
  set: (value) => { internalLedger.value = value; }
});

async function onSearch(query: string) {
  try {
    error.value = null
    pending.value = true
    ledger.value = null

    if (!query.trim()) {
      error.value = 'Please enter a ledger sequence number or hash'
      return
    }

    const result = await getLedgerById(query)
    
    if (!result) {
      error.value = 'Ledger not found or an error occurred'
      return
    }

    ledger.value = result
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'An unexpected error occurred'
  } finally {
    pending.value = false
  }
}
</script>