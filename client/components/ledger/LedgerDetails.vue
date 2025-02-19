// components/ledger/LedgerDetails.vue
<template>
  <Card class="border-gray-700 bg-gray-800/50">
    <CardHeader>
      <CardTitle class="text-white">Ledger Details</CardTitle>
      <CardDescription class="text-gray-400">Sequence #{{ ledger.sequence }}</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid gap-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h4 class="font-medium text-white">Basic Information</h4>
            <LedgerField
              label="Hash"
              :value="ledger.hash"
              :copyable="true"
            />
            <LedgerField
              label="Previous Hash"
              :value="ledger.prevHash"
              :copyable="true"
            />
            <LedgerField
              label="Closed At"
              :value="formatDate(ledger.closedAt)"
            />
          </div>

          <div class="space-y-4">
            <h4 class="font-medium text-white">Statistics</h4>
            <div class="space-y-2">
              <Label class="text-gray-400">Transaction Status</Label>
              <div class="flex gap-2">
                <Badge
                  variant="outline"
                  class="bg-green-500/10 text-green-500 border-green-500/20"
                >
                  {{ ledger.successfulTransactionCount }} Successful
                </Badge>
                <Badge variant="destructive">
                  {{ ledger.failedTransactionCount }} Failed
                </Badge>
              </div>
            </div>
            <LedgerField
              label="Operation Count"
              :value="ledger.operationCount.toString()"
            />
            <LedgerField
              label="Total Coins"
              :value="ledger.totalCoins"
            />
            <LedgerField
              label="Fee Pool"
              :value="ledger.feePool"
            />
          </div>
        </div>

        <Separator class="bg-gray-700" />

        <div class="space-y-4">
          <h4 class="font-medium text-white">Transactions</h4>
          <div class="space-y-2">
            <Card
              v-for="tx in ledger.transactions"
              :key="tx.hash"
              class="border-gray-700 bg-gray-800/30 hover:bg-gray-700/50 cursor-pointer transition-colors"
              @click="navigateToTransaction(tx.hash)"
            >
              <CardContent class="p-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div class="font-mono text-gray-300">{{ truncateHash(tx.hash) }}</div>
                  <div class="flex items-center gap-2">
                    <Badge
                      :variant="tx.successful ? 'outline' : 'destructive'"
                      :class="tx.successful ? 'bg-green-500/10 text-green-500 border-green-500/20' : ''"
                    >
                      {{ tx.successful ? 'Successful' : 'Failed' }}
                    </Badge>
                    <span class="text-sm text-gray-400">{{ tx.operationCount }} ops</span>
                  </div>
                  <div class="text-sm text-gray-400">{{ formatDate(tx.createdAt) }}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import type { Ledger } from '@/features/ledger/model'
const router = useRouter()

const props = defineProps<{
  ledger: Ledger
}>()

function truncateHash(hash: string): string {
  return `${hash.slice(0, 8)}...${hash.slice(-8)}`
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleString("pt-BR")
}

// function navigateToTransaction(hash: string) {
//   navigateTo(`/transactions/${hash}`)
// }

function navigateToTransaction(hash: string) {
  router.push({
    path: '/transaction',
    state: { hash: hash }
  })
}
</script>