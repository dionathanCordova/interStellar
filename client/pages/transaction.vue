<!-- <template>
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
</script> -->

<!-- <template>
  <div class="container mx-auto p-8">
    <h1 class="text-2xl font-bold text-white mb-6">Search Transaction</h1>
    
    <SearchCard 
      label="Transaction Hash" 
      @search="onSearch"
    />

    <div v-if="pending && !transaction" class="mt-6">
      <Card class="border-gray-700 bg-gray-800/50">
        <CardContent class="pt-6">
          <div class="flex justify-center">
            <Icon 
              name="lucide:loader" 
              class="animate-spin text-blue-500" 
              size="32"
            />
          </div>
        </CardContent>
      </Card>
    </div>

    <div v-if="error" class="mt-6">
      <Alert variant="destructive">
        <Icon 
          name="lucide:alert-circle" 
          class="h-4 w-4"
        />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {{ error }}
        </AlertDescription>
      </Alert>
    </div>

    <div v-if="transaction" class="mt-6 space-y-6">
      <Card class="border-gray-700 bg-gray-800/50">
        <CardHeader>
          <CardTitle class="text-white">Transaction Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div class="space-y-4">
              <div class="space-y-2">
                <Label class="text-gray-400">Hash</Label>
                <div class="flex items-center space-x-2">
                  <p class="text-sm text-white break-all">{{ transaction.hash }}</p>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    @click="copyToClipboard(transaction.hash)"
                  >
                    <Icon name="lucide:copy" size="16" />
                  </Button>
                </div>
              </div>

              <div class="space-y-2">
                <Label class="text-gray-400">Status</Label>
                <Badge :variant="transaction.successful ? 'default' : 'destructive'">
                  {{ transaction.successful ? 'Successful' : 'Failed' }}
                </Badge>
              </div>

              <div class="space-y-2">
                <Label class="text-gray-400">Created At</Label>
                <p class="text-sm text-white">{{ formatDate(transaction.createdAt) }}</p>
              </div>

              <div class="space-y-2">
                <Label class="text-gray-400">Ledger</Label>
                <p class="text-sm text-white">{{ transaction.ledger }}</p>
              </div>
            </div>

            
            <div class="space-y-4">
              <div class="space-y-2">
                <Label class="text-gray-400">Source Account</Label>
                <div class="flex items-center space-x-2">
                  <p class="text-sm text-white break-all">{{ transaction.sourceAccount }}</p>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    @click="copyToClipboard(transaction.sourceAccount)"
                  >
                    <Icon name="lucide:copy" size="16" />
                  </Button>
                </div>
              </div>

              <div class="space-y-2">
                <Label class="text-gray-400">Fee Charged</Label>
                <p class="text-sm text-white">{{ transaction.feeCharged }}</p>
              </div>

              <div class="space-y-2">
                <Label class="text-gray-400">Operation Count</Label>
                <p class="text-sm text-white">{{ transaction.operationCount }}</p>
              </div>

              <div class="space-y-2">
                <Label class="text-gray-400">Memo Type</Label>
                <p class="text-sm text-white">{{ transaction.memoType }}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTransactionService } from '@/features/transaction/service'
import type { Transaction } from '@/features/transaction/model'
import { useToast } from '@/components/ui/toast'

const { getTransactionById } = useTransactionService()
const { toast } = useToast()

const transaction = ref<Transaction | null>(null)
const error = ref<string | null>(null)
const pending = ref(false)

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString()
}

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "Text copied to clipboard",
      variant: "default",
    })
  } catch (e) {
    toast({
      title: "Error",
      description: "Failed to copy text",
      variant: "destructive",
    })
  }
}

async function onSearch(hash: string) {
  try {
    error.value = null
    pending.value = true
    transaction.value = null

    if (!hash.trim()) {
      error.value = 'Please enter a transaction hash'
      return
    }

    const result = await getTransactionById(hash)
    
    if (!result) {
      error.value = 'Transaction not found or an error occurred'
      return
    }

    transaction.value = result
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'An unexpected error occurred'
  } finally {
    pending.value = false
  }
}
</script> -->

<template>
  <div class="container mx-auto p-8">
    <!-- <h1 class="text-2xl font-bold text-white mb-6">Search Transaction</h1> -->
    
    <SearchCard 
      label="Transaction Hash"
      placeholder="Enter the transaction hash"
      :pending="pending"
      @search="onSearch"
      v-model="internalHash"
    />

    <!-- Error State -->
    <div v-if="error" class="mt-6">
      <Alert variant="destructive">
        <Icon name="lucide:alert-circle" class="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{{ error }}</AlertDescription>
      </Alert>
    </div>

    <!-- Transaction Details -->
    <div v-if="transaction" class="mt-6">
      <TransactionDetails :transaction="transaction" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useTransactionService } from '@/features/transaction/service'
import type { Transaction } from '@/features/transaction/model'

const { getTransactionById } = useTransactionService()

const transaction = ref<Transaction | null>(null)
const error = ref<string | null>(null)
const pending = ref(false)
const route = useRoute()
const router = useRouter()
const internalHash = ref('')

async function fetchTransaction(query:string): Promise<void> {
  if (!query.trim()) {
    error.value = 'Please enter a transaction hash'
    transaction.value = null
    return
  }

  try {
    pending.value = true
    error.value = null
    transaction.value = null

    const result = await getTransactionById(query)
    
    if (!result) {
      error.value = 'Transaction not found or an error occurred'
      return
    }
    
    transaction.value = result
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'An unexpected error occurred'
  } finally {
    pending.value = false
  }
}

// Observa mudanças na query da rota
watch(() => route.query.hash, async (newTransactionQuery) => {
  if (newTransactionQuery) {
    internalHash.value = newTransactionQuery as string
    await fetchTransaction(newTransactionQuery as string)
  } else {
    // Limpa os dados quando não há query
    transaction.value = null
    error.value = null
  }
}, { immediate: true })

onMounted(() => {  
  if (route.query.hash) {
    internalHash.value = route.query.hash as string
  }
})

async function onSearch(hash: string) {
  await router.replace({ query: { hash: hash } })
}
</script>