<template>
  <div class="container mx-auto p-8">
    <h1 class="text-2xl font-bold text-white mb-6">Portfolio Balance</h1>
    
    <SearchCard
      label="Account ID"
      placeholder="Enter the account ID"
      :pending="pending"
      @search="onSearch"
    />

    <!-- Error State -->
    <div v-if="error" class="mt-6">
      <Alert variant="destructive">
        <Icon name="lucide:alert-circle" class="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{{ error }}</AlertDescription>
      </Alert>
    </div>

    <!-- Portfolio Details -->
    <div v-if="account" class="mt-6">
      <WalletDetails :account="account" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAccountService } from '@/features/wallet/service'
import type { Account } from '@/features/wallet/model'

const { getAccountById } = useAccountService()
const account = ref<Account | null>(null)
const error = ref<string | null>(null)
const pending = ref(false)

async function onSearch(accountId: string) {
  try {
    error.value = null
    pending.value = true
    account.value = null

    if (!accountId.trim()) {
      error.value = 'Please enter an account ID'
      return
    }

    const result = await getAccountById(accountId)
    
    if (!result) {
      error.value = 'Account not found or an error occurred'
      return
    }

    account.value = result
    console.log(account.value)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'An unexpected error occurred'
  } finally {
    pending.value = false
  }
}
</script>