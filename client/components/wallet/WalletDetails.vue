<template>
  <Card class="border-gray-700 bg-gray-800/50">
    <CardHeader>
      <CardTitle class="text-white">Portfolio Details</CardTitle>
      <CardDescription class="text-gray-400 truncate">
        Account: {{ account.accountId }}
      </CardDescription>
    </CardHeader>
    
    <CardContent>
      <div class="space-y-6">
        <!-- Asset Balance Cards -->
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <!-- Native Balance Card -->
          <Card class="border-gray-700 bg-gray-800/30">
            <CardHeader class="pb-2">
              <CardTitle class="text-sm font-medium text-gray-300">Native Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold text-white">{{ account.getNativeBalance() }} XLM</div>
            </CardContent>
          </Card>

          <!-- Asset Balances -->
          <Card v-for="balance in nonNativeBalances" 
                :key="balance.asset_code"
                class="border-gray-700 bg-gray-800/30">
            <CardHeader class="pb-2">
              <CardTitle class="text-sm font-medium text-gray-300">{{ balance.asset_code }}</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold text-white">{{ balance.balance }}</div>
              <p class="text-xs text-gray-400">
                Issuer: {{ truncateAddress(balance.asset_issuer) }}
              </p>
            </CardContent>
          </Card>
        </div>

        <!-- Account Details -->
        <div class="mt-6 space-y-4">
          <h3 class="text-lg font-semibold text-white">Account Details</h3>
          
          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <h4 class="font-medium text-gray-400">Last Modified</h4>
              <p class="text-gray-200">{{ new Date(account.lastModifiedTime).toLocaleString() }}</p>
            </div>
            
            <div>
              <h4 class="font-medium text-gray-400">Sequence Number</h4>
              <p class="text-gray-200">{{ account.sequence }}</p>
            </div>

            <div>
              <h4 class="font-medium text-gray-400">Subentry Count</h4>
              <p class="text-gray-200">{{ account.subentryCount }}</p>
            </div>

            <div>
              <h4 class="font-medium text-gray-400">Number of Signers</h4>
              <p class="text-gray-200">{{ account.signers.length }}</p>
            </div>
          </div>
        </div>

        <!-- Asset Liabilities Table -->
        <div class="mt-6">
          <h3 class="text-lg font-semibold text-white mb-4">Asset Liabilities</h3>
          <div class="border border-gray-700 rounded-lg">
            <Table>
              <TableHeader>
                <TableRow class="border-gray-700 hover:bg-gray-800/50">
                  <TableHead class="text-gray-400">Asset</TableHead>
                  <TableHead class="text-gray-400">Balance</TableHead>
                  <TableHead class="text-gray-400">Buying Liabilities</TableHead>
                  <TableHead class="text-gray-400">Selling Liabilities</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="balance in account.balances" 
                         :key="getAssetKey(balance)"
                         class="border-gray-700 hover:bg-gray-800/50">
                  <TableCell class="text-gray-200">{{ getAssetName(balance) }}</TableCell>
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