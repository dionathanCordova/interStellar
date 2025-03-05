<template>
  <Card class="border-gray-700/40 bg-gray-800/30 backdrop-blur-lg shadow-xl rounded-xl overflow-hidden">
    <CardHeader class="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-b border-gray-700/30">
      <div class="flex items-center justify-between">
        <div>
          <CardTitle class="text-white text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Transaction Details</CardTitle>
          <CardDescription class="text-gray-300 mt-1">
            <span class="text-xs bg-gray-700/50 rounded-full px-2 py-0.5">Ledger #{{ transaction.ledger }}</span>
          </CardDescription>
        </div>
        <div class="p-2 text-blue-400">
          <Icon name="lucide:file-text" class="h-5 w-5" />
        </div>
      </div>
    </CardHeader>
    
    <CardContent class="p-6">
      <!-- Status Badge - Highlighted at top -->
      <div class="mb-6 flex items-center justify-center">
        <div class="px-4 py-2 rounded-full flex items-center space-x-2"
             :class="transaction.successful ? 
                    'bg-green-500/10 text-green-400 border border-green-500/20' : 
                    'bg-red-500/10 text-red-400 border border-red-500/20'">
          <Icon :name="transaction.successful ? 'lucide:check-circle' : 'lucide:alert-circle'" class="h-5 w-5" />
          <span class="font-medium">{{ transaction.successful ? 'Transaction Successful' : 'Transaction Failed' }}</span>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Left Column -->
        <div class="space-y-6">
          <div class="rounded-xl border border-gray-700/50 bg-gray-800/20 backdrop-blur-sm p-4 transition-all duration-300 hover:shadow-md hover:shadow-blue-500/10 hover:border-blue-500/30">
            <h3 class="text-sm font-medium text-gray-400 flex items-center mb-2">
              <Icon name="lucide:hash" class="mr-2 h-4 w-4 text-blue-400" />
              Transaction Hash
            </h3>
            <div class="flex items-center justify-between">
              <p class="text-gray-200 font-medium text-sm truncate max-w-xs">{{ transaction.hash }}</p>
              <button class="text-blue-400 hover:text-blue-300 transition-colors" @click="copyToClipboard(transaction.hash, 'hash')">
                <Icon name="lucide:copy" class="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div class="rounded-xl border border-gray-700/50 bg-gray-800/20 backdrop-blur-sm p-4 transition-all duration-300 hover:shadow-md hover:shadow-purple-500/10 hover:border-purple-500/30">
            <h3 class="text-sm font-medium text-gray-400 flex items-center mb-2">
              <Icon name="lucide:calendar" class="mr-2 h-4 w-4 text-purple-400" />
              Created At
            </h3>
            <p class="text-gray-200 font-medium">{{ formatDate(transaction.createdAt) }}</p>
          </div>
          
          <div class="rounded-xl border border-gray-700/50 bg-gray-800/20 backdrop-blur-sm p-4 transition-all duration-300 hover:shadow-md hover:shadow-indigo-500/10 hover:border-indigo-500/30">
            <h3 class="text-sm font-medium text-gray-400 flex items-center mb-2">
              <Icon name="lucide:layers" class="mr-2 h-4 w-4 text-indigo-400" />
              Ledger
            </h3>
            <p class="text-gray-200 font-medium">{{ transaction.ledger.toString() }}</p>
          </div>
        </div>
        
        <!-- Right Column -->
        <div class="space-y-6">
          <div class="rounded-xl border border-gray-700/50 bg-gray-800/20 backdrop-blur-sm p-4 transition-all duration-300 hover:shadow-md hover:shadow-cyan-500/10 hover:border-cyan-500/30">
            <h3 class="text-sm font-medium text-gray-400 flex items-center mb-2">
              <Icon name="lucide:user" class="mr-2 h-4 w-4 text-cyan-400" />
              Source Account
            </h3>
            <div class="flex items-center justify-between">
              <p class="text-gray-200 font-medium text-sm truncate max-w-xs">{{ transaction.sourceAccount }}</p>
              <button class="text-cyan-400 hover:text-cyan-300 transition-colors" @click="copyToClipboard(transaction.sourceAccount, 'account')">
                <Icon name="lucide:copy" class="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div class="rounded-xl border border-gray-700/50 bg-gray-800/20 backdrop-blur-sm p-4 transition-all duration-300 hover:shadow-md hover:shadow-teal-500/10 hover:border-teal-500/30">
            <h3 class="text-sm font-medium text-gray-400 flex items-center mb-2">
              <Icon name="lucide:credit-card" class="mr-2 h-4 w-4 text-teal-400" />
              Fee Charged
            </h3>
            <p class="text-gray-200 font-medium">{{ transaction.feeCharged }} stroops</p>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div class="rounded-xl border border-gray-700/50 bg-gray-800/20 backdrop-blur-sm p-4 transition-all duration-300 hover:shadow-md hover:shadow-pink-500/10 hover:border-pink-500/30">
              <h3 class="text-sm font-medium text-gray-400 flex items-center mb-2">
                <Icon name="lucide:activity" class="mr-2 h-4 w-4 text-pink-400" />
                Operations
              </h3>
              <p class="text-gray-200 font-medium">{{ transaction.operationCount.toString() }}</p>
            </div>
            
            <div class="rounded-xl border border-gray-700/50 bg-gray-800/20 backdrop-blur-sm p-4 transition-all duration-300 hover:shadow-md hover:shadow-amber-500/10 hover:border-amber-500/30">
              <h3 class="text-sm font-medium text-gray-400 flex items-center mb-2">
                <Icon name="lucide:tag" class="mr-2 h-4 w-4 text-amber-400" />
                Memo Type
              </h3>
              <p class="text-gray-200 font-medium">{{ transaction.memoType || 'None' }}</p>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import type { Transaction } from '@/features/transaction/model'
import { useToast } from '@/components/ui/toast'
const { toast } = useToast()

defineProps<{
  transaction: Transaction
}>()

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString("pt-BR")
}

function copyToClipboard(text: string, type: 'hash' | 'account'): void {
  navigator.clipboard.writeText(text).then(() => {
    toast({
      title: "Copied to Clipboard",
      description: type === 'hash'
        ? "Transaction hash copied successfully"
        : "Account address copied successfully",
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