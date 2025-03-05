// components/ledger/LedgerDetails.vue
<template>
  <Card class="border-gray-700/40 bg-gray-800/30 backdrop-blur-lg shadow-xl rounded-xl overflow-hidden">
    <CardHeader class="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-b border-gray-700/30">
      <div class="flex items-center justify-between">
        <div>
          <CardTitle class="text-white text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Ledger Details</CardTitle>
          <CardDescription class="text-gray-300 mt-1">
            <span class="text-xs bg-gray-700/50 rounded-full px-2 py-0.5">Sequence #{{ ledger.sequence }}</span>
          </CardDescription>
        </div>
        <div class="p-2 text-blue-400">
          <Icon name="lucide:book-open" class="h-5 w-5" />
        </div>
      </div>
    </CardHeader>
    
    <CardContent class="p-6">
      <div class="space-y-8">
        <!-- Basic Information and Statistics in modified layout -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Left Column - Basic Information - updated to better use space -->
          <div class="flex flex-col">
            <div class="rounded-xl border border-gray-700/50 bg-gray-800/20 backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-md hover:shadow-blue-500/10 hover:border-blue-500/30 h-full flex flex-col justify-between">
              <div>
                <h3 class="text-sm font-medium text-gray-400 flex items-center mb-6">
                  <Icon name="lucide:info" class="mr-2 h-4 w-4 text-blue-400" />
                  Basic Information
                </h3>
                
                <div class="space-y-3">
                  <div>
                    <h4 class="text-xs font-medium text-gray-400 mb-3 flex items-center">
                      <Icon name="lucide:hash" class="mr-2 h-3 w-3 text-blue-400" />
                      Hash
                    </h4>
                    <div class="flex items-center bg-gray-900/30 rounded-lg p-3 border border-gray-700/30">
                      <p class="text-gray-200 font-medium text-sm truncate flex-1">{{ ledger.hash }}</p>
                      <button class="text-blue-400 hover:text-blue-300 transition-colors ml-2" @click="copyToClipboard(ledger.hash, 'ledgerHash')">
                        <Icon name="lucide:copy" class="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 class="text-xs font-medium text-gray-400 mb-3 flex items-center">
                      <Icon name="lucide:git-branch" class="mr-2 h-3 w-3 text-purple-400" />
                      Previous Hash
                    </h4>
                    <div class="flex items-center bg-gray-900/30 rounded-lg p-3 border border-gray-700/30">
                      <p class="text-gray-200 font-medium text-sm truncate flex-1">{{ ledger.prevHash }}</p>
                      <button class="text-purple-400 hover:text-purple-300 transition-colors ml-2" @click="copyToClipboard(ledger.prevHash, 'prevHash')">
                        <Icon name="lucide:copy" class="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="mt-3">
                <h4 class="text-xs font-medium text-gray-400 mb-2 flex items-center">
                  <Icon name="lucide:calendar" class="mr-2 h-3 w-3 text-indigo-400" />
                  Closed At
                </h4>
                <div class="flex items-center justify-between">
                  <p class="text-gray-200 font-medium">{{ formatDate(ledger.closedAt) }}</p>
                  <div class="bg-indigo-500/20 rounded-full px-3 py-1 text-xs text-indigo-300">
                    {{ getTimeAgo(ledger.closedAt) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Right Column - Statistics -->
          <div class="space-y-6">
            <!-- Transaction Status -->
            <div class="rounded-xl border border-gray-700/50 bg-gray-800/20 backdrop-blur-sm p-4 transition-all duration-300 hover:shadow-md hover:shadow-teal-500/10 hover:border-teal-500/30">
              <h3 class="text-sm font-medium text-gray-400 flex items-center mb-4">
                <Icon name="lucide:activity" class="mr-2 h-4 w-4 text-teal-400" />
                Transaction Status
              </h3>
              
              <div class="flex gap-3">
                <div class="flex-1 rounded-lg bg-green-500/10 border border-green-500/20 p-3 flex flex-col items-center justify-center">
                  <div class="flex items-center space-x-2 mb-1">
                    <Icon name="lucide:check-circle" class="h-4 w-4 text-green-400" />
                    <span class="text-green-400 font-medium">Successful</span>
                  </div>
                  <span class="text-xl font-bold text-white">{{ ledger.successfulTransactionCount }}</span>
                </div>
                
                <div class="flex-1 rounded-lg bg-red-500/10 border border-red-500/20 p-3 flex flex-col items-center justify-center">
                  <div class="flex items-center space-x-2 mb-1">
                    <Icon name="lucide:alert-circle" class="h-4 w-4 text-red-400" />
                    <span class="text-red-400 font-medium">Failed</span>
                  </div>
                  <span class="text-xl font-bold text-white">{{ ledger.failedTransactionCount }}</span>
                </div>
              </div>
            </div>
            
            <!-- Other Statistics - Redesigned as 3 equal cards with formatted numbers -->
            <div class="rounded-xl border border-gray-700/50 bg-gray-800/20 backdrop-blur-sm p-4 transition-all duration-300 hover:shadow-md hover:shadow-indigo-500/10 hover:border-indigo-500/30">
              <h3 class="text-sm font-medium text-gray-400 flex items-center mb-4">
                <Icon name="lucide:bar-chart-3" class="mr-2 h-4 w-4 text-indigo-400" />
                Ledger Statistics
              </h3>
              
              <div class="grid grid-cols-3 gap-3">
                <div class="rounded-lg bg-purple-500/10 border border-purple-500/20 p-3 flex flex-col items-center justify-center">
                  <div class="flex items-center space-x-2 mb-1">
                    <Icon name="lucide:layers" class="h-4 w-4 text-purple-400" />
                    <span class="text-purple-400 font-medium text-xs">Operations</span>
                  </div>
                  <span class="text-lg font-bold text-white">{{ formatNumber(ledger.operationCount) }}</span>
                </div>
                
                <div class="rounded-lg bg-cyan-500/10 border border-cyan-500/20 p-3 flex flex-col items-center justify-center">
                  <div class="flex items-center space-x-2 mb-1">
                    <Icon name="lucide:coins" class="h-4 w-4 text-cyan-400" />
                    <span class="text-cyan-400 font-medium text-xs">Total Coins</span>
                  </div>
                  <div class="text-center">
                    <span class="text-lg font-bold text-white truncate block" :title="ledger.totalCoins">
                      {{ formatCoinAmount(ledger.totalCoins) }}
                    </span>
                  </div>
                </div>
                
                <div class="rounded-lg bg-amber-500/10 border border-amber-500/20 p-3 flex flex-col items-center justify-center">
                  <div class="flex items-center space-x-2 mb-1">
                    <Icon name="lucide:database" class="h-4 w-4 text-amber-400" />
                    <span class="text-amber-400 font-medium text-xs">Fee Pool</span>
                  </div>
                  <span class="text-lg font-bold text-white">{{ formatCoinAmount(ledger.feePool) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Transactions Section -->
        <div class="rounded-xl overflow-hidden border border-gray-700/50 bg-gray-800/20 backdrop-blur-sm">
          <div class="p-4 bg-gradient-to-r from-gray-800/40 to-gray-700/40 border-b border-gray-700/30">
            <h3 class="text-lg font-semibold text-white flex items-center">
              <Icon name="lucide:file-text" class="mr-2 h-5 w-5 text-purple-400" />
              Transactions
              <span class="ml-2 text-xs bg-gray-700/50 rounded-full px-2 py-0.5 text-gray-300">{{ ledger.transactions.length }}</span>
            </h3>
          </div>
          
          <div class="p-4 space-y-3">
            <div
              v-for="tx in ledger.transactions"
              :key="tx.hash"
              class="group relative overflow-hidden rounded-lg border border-gray-700/30 bg-gray-800/20 backdrop-blur-sm hover:bg-gray-700/30 hover:border-gray-600/50 cursor-pointer transition-all duration-200"
              @click="navigateToTransaction(tx.hash)"
            >
              <div class="absolute inset-0 bg-gradient-to-br" :class="tx.successful ? 'from-green-600/5 to-blue-600/5' : 'from-red-600/5 to-orange-600/5'"></div>
              <div class="relative p-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div class="font-mono text-gray-300 flex items-center">
                    <div class="w-2 h-2 rounded-full mr-2"
                         :class="tx.successful ? 'bg-green-400' : 'bg-red-400'"></div>
                    <span>{{ truncateHash(tx.hash) }}</span>
                    <button class="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-200" @click.stop="copyToClipboard(tx.hash, 'hash')">
                      <Icon name="lucide:copy" class="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div class="flex items-center">
                    <Badge
                      :class="tx.successful ? 
                             'bg-green-500/10 text-green-400 border border-green-500/20' : 
                             'bg-red-500/10 text-red-400 border border-red-500/20'"
                      class="mr-2"
                    >
                      {{ tx.successful ? 'Successful' : 'Failed' }}
                    </Badge>
                    <div class="flex items-center text-sm text-gray-400">
                      <Icon name="lucide:layers" class="h-4 w-4 mr-1" />
                      {{ tx.operationCount }} ops
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-end text-sm text-gray-400">
                    <Icon name="lucide:clock" class="h-4 w-4 mr-1" />
                    {{ formatDate(tx.createdAt) }}
                    <Icon name="lucide:chevron-right" class="h-4 w-4 ml-2 text-gray-500 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import type { Ledger } from '@/features/ledger/model'
import { useToast } from '@/components/ui/toast'

const router = useRouter()
const { toast } = useToast()

const props = defineProps<{
  ledger: Ledger
}>()

function truncateHash(hash: string): string {
  return `${hash.slice(0, 8)}...${hash.slice(-8)}`
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleString("pt-BR")
}

function getTimeAgo(dateStr: string): string {
  const now = new Date()
  const date = new Date(dateStr)
  const diffMs = now.getTime() - date.getTime()
  const diffSec = Math.round(diffMs / 1000)
  const diffMin = Math.round(diffSec / 60)
  const diffHour = Math.round(diffMin / 60)
  const diffDay = Math.round(diffHour / 24)

  if (diffDay > 0) {
    return `${diffDay} ${diffDay === 1 ? 'day' : 'days'} ago`
  } else if (diffHour > 0) {
    return `${diffHour} ${diffHour === 1 ? 'hour' : 'hours'} ago`
  } else if (diffMin > 0) {
    return `${diffMin} ${diffMin === 1 ? 'minute' : 'minutes'} ago`
  } else {
    return `${diffSec} ${diffSec === 1 ? 'second' : 'seconds'} ago`
  }
}

function formatNumber(num: number): string {
  return num.toLocaleString("en-US")
}

function formatCoinAmount(amount: number | string): string {
  // Convert to number if it's a string
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount

  // Handle extremely large numbers
  if (numAmount >= 1_000_000_000) {
    return (numAmount / 1_000_000_000).toFixed(2) + 'B'
  } else if (numAmount >= 1_000_000) {
    return (numAmount / 1_000_000).toFixed(2) + 'M'
  } else if (numAmount >= 1_000) {
    return (numAmount / 1_000).toFixed(2) + 'K'
  } else {
    return numAmount.toLocaleString("en-US")
  }
}

function navigateToTransaction(hash: string) {
  router.push({
    path: '/transaction',
    query: { hash: hash }
  })
}

function copyToClipboard(text: string, type: 'hash' | 'ledgerHash' | 'prevHash' = 'hash') {
  navigator.clipboard.writeText(text).then(() => {
    const toastVariants = {
      hash: {
        title: "Copied to Clipboard",
        description: "Transaction hash copied successfully",
      },
      ledgerHash: {
        title: "Copied to Clipboard",
        description: "Ledger hash copied successfully",
      },
      prevHash: {
        title: "Copied to Clipboard",
        description: "Previous hash copied successfully",
      }
    }
    
    const variant = toastVariants[type]
    
    toast({
      title: variant.title,
      description: variant.description,
      variant: "default",
      class: `
        success-toast
        text-white
        rounded-lg
        shadow-lg
      `
    })
  })
}
</script>

<style>
.success-toast {
  position: relative;
  overflow: hidden;
  background: linear-gradient(to bottom right, rgba(39, 226, 107, 0.2), rgba(37, 99, 235, 0.15));
  backdrop-filter: blur(8px);
  border: 0;
}
</style>