<template>
  <Card class="border-gray-700/40 bg-gray-800/30 backdrop-blur-lg shadow-xl rounded-xl overflow-hidden">
    <CardHeader class="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-b border-gray-700/30">
      <div class="flex items-center justify-between">
        <div>
          <CardTitle class="text-white text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Account Details</CardTitle>
          <CardDescription class="text-gray-300 truncate mt-1 flex items-center">
            <span class="text-xs bg-gray-700/50 rounded-full px-2 py-0.5 mr-2">Account</span>
            {{ account.accountId }}
          </CardDescription>
        </div>
        <div class="p-2 text-blue-400">
          <Icon name="lucide:wallet" class="h-5 w-5" />
        </div>
      </div>
    </CardHeader>
    
    <CardContent class="p-6">
      <div class="space-y-8">
        <!-- Asset Balance Cards -->
        <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <!-- Native Balance Card -->
          <div class="group relative overflow-hidden rounded-xl border border-gray-700/50 bg-gray-800/20 backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:shadow-blue-500/10 hover:border-blue-500/30">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="relative p-5">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-sm font-medium text-gray-300">Native Balance</h3>
                <div class="bg-blue-500/10 p-1 rounded-full">
                  <Icon name="lucide:coins" class="h-4 w-4 text-blue-400" />
                </div>
              </div>
              <div class="text-2xl font-bold text-white">{{ account.getNativeBalance() }} <span class="text-blue-400">XLM</span></div>
            </div>
          </div>

          <!-- Asset Balances -->
          <div v-for="balance in nonNativeBalances" 
                :key="balance.asset_code"
                class="group relative overflow-hidden rounded-xl border border-gray-700/50 bg-gray-800/20 backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:shadow-purple-500/10 hover:border-purple-500/30">
            <div class="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="relative p-5">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-sm font-medium text-gray-300">{{ balance.asset_code }}</h3>
                <div class="bg-purple-500/10 p-1 rounded-full">
                  <Icon name="lucide:landmark" class="h-4 w-4 text-purple-400" />
                </div>
              </div>
              <div class="text-2xl font-bold text-white">{{ balance.balance }}</div>
              <p class="text-xs text-gray-400 mt-2 flex items-center">
                <Icon name="lucide:building" class="h-3 w-3 mr-1" />
                <span>Issuer: {{ truncateAddress(balance.asset_issuer) }}</span>
              </p>
            </div>
          </div>
        </div>

        <!-- Account Details -->
        <div class="rounded-xl border border-gray-700/50 bg-gray-800/20 backdrop-blur-sm p-6">
          <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
            <Icon name="lucide:info" class="mr-2 h-5 w-5 text-blue-400" />
            Account Details
          </h3>
          
          <div class="grid gap-6 md:grid-cols-2">
            <div class="space-y-1">
              <h4 class="font-medium text-gray-400 text-sm flex items-center">
                <Icon name="lucide:clock" class="mr-1 h-3 w-3" /> Last Modified
              </h4>
              <p class="text-gray-200 font-medium">{{ new Date(account.lastModifiedTime).toLocaleString() }}</p>
            </div>
            
            <div class="space-y-1">
              <h4 class="font-medium text-gray-400 text-sm flex items-center">
                <Icon name="lucide:hash" class="mr-1 h-3 w-3" /> Sequence Number
              </h4>
              <p class="text-gray-200 font-medium">{{ account.sequence }}</p>
            </div>

            <div class="space-y-1">
              <h4 class="font-medium text-gray-400 text-sm flex items-center">
                <Icon name="lucide:layers" class="mr-1 h-3 w-3" /> Subentry Count
              </h4>
              <p class="text-gray-200 font-medium">{{ account.subentryCount }}</p>
            </div>

            <div class="space-y-1">
              <h4 class="font-medium text-gray-400 text-sm flex items-center">
                <Icon name="lucide:users" class="mr-1 h-3 w-3" /> Number of Signers
              </h4>
              <p class="text-gray-200 font-medium">{{ account.signers.length }}</p>
            </div>
          </div>
        </div>

        <!-- Asset Liabilities Table -->
        <div class="rounded-xl overflow-hidden border border-gray-700/50 bg-gray-800/20 backdrop-blur-sm">
          <div class="p-4 bg-gradient-to-r from-gray-800/40 to-gray-700/40 border-b border-gray-700/30">
            <h3 class="text-lg font-semibold text-white flex items-center">
              <Icon name="lucide:bar-chart-2" class="mr-2 h-5 w-5 text-purple-400" />
              Asset Liabilities
            </h3>
          </div>
          
          <div class="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow class="border-gray-700/50 hover:bg-gray-800/50">
                  <TableHead class="text-gray-300 font-medium">Asset</TableHead>
                  <TableHead class="text-gray-300 font-medium">Balance</TableHead>
                  <TableHead class="text-gray-300 font-medium">Buying Liabilities</TableHead>
                  <TableHead class="text-gray-300 font-medium">Selling Liabilities</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="balance in account.balances" 
                         :key="getAssetKey(balance)"
                         class="border-gray-700/50 hover:bg-gray-700/20 transition-colors duration-150">
                  <TableCell class="text-gray-200 font-medium">
                    <div class="flex items-center">
                      <div class="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mr-2">
                        <span class="text-xs text-blue-400">{{ getAssetName(balance).charAt(0) }}</span>
                      </div>
                      {{ getAssetName(balance) }}
                    </div>
                  </TableCell>
                  <TableCell class="text-gray-200">{{ balance.balance }}</TableCell>
                  <TableCell class="text-gray-200">{{ balance.buying_liabilities }}</TableCell>
                  <TableCell class="text-gray-200">{{ balance.selling_liabilities }}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Account } from '@/features/wallet/model'

const props = defineProps<{
  account: Account
}>()

// Computed property for non-native balances
const nonNativeBalances = computed(() => {
  return props.account.balances.filter(b => b.asset_type !== 'native')
})

// Helper function to truncate address
function truncateAddress(address?: string) {
  if (!address) return ''
  return `${address.slice(0, 4)}...${address.slice(-4)}`
}

// Helper function to get asset name
function getAssetName(balance: any) {
  if (balance.asset_type === 'native') return 'XLM'
  return balance.asset_code
}

// Helper function to generate unique key for balance items
function getAssetKey(balance: any) {
  if (balance.asset_type === 'native') return 'native'
  return `${balance.asset_code}-${balance.asset_issuer}`
}
</script>