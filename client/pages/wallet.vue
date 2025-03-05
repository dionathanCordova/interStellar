<template>
  <div class="container mx-auto p-8">
    <!-- <h1 class="text-2xl font-bold text-white mb-6">Portfolio Balance</h1> -->
    
    <SearchCard
      label="Account ID"
      placeholder="Enter the account ID"
      :pending="pending"
      @search="onSearch"
      v-model="internalAddress"
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
import { ref, watch, onMounted } from 'vue'
import { useAccountService } from '@/features/wallet/service'
import type { Account } from '@/features/wallet/model'

const { getAccountById } = useAccountService()
const account = ref<Account | null>(null)
const error = ref<string | null>(null)
const pending = ref(false)
const internalAddress = ref('')
const route = useRoute()
const router = useRouter()

async function fetchWallet(query: string): Promise<void> {
  if (!query.trim()) {
    error.value = 'Please enter a valid wallet'
    account.value = null
    return
  }

  try {
    pending.value = true
    error.value = null
    account.value = null

    const result = await getAccountById(query)
    
    if (!result) {
      error.value = 'Wallet not found or an error occurred'
      return
    }
    
    account.value = result
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'An unexpected error occurred'
  } finally {
    pending.value = false
  }
}

watch(() => route.query.address, async (newWalletQuery) => {
  if (newWalletQuery) {
    internalAddress.value = newWalletQuery as string
    await fetchWallet(newWalletQuery as string)
  } else {
    account.value = null
    error.value = null
  }
}, { immediate: true })

onMounted(() => {
  if (route.query.address) {
    internalAddress.value = route.query.address as string
  }
})

async function onSearch(query: string) {
  await router.replace({ query: { address: query } })
}
</script>