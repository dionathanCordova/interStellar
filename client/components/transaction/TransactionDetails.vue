<!-- components/transaction/TransactionDetails.vue -->
<template>
  <Card class="border-gray-700 bg-gray-800/50">
    <CardHeader>
      <CardTitle class="text-white">Transaction Details</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Left Column -->
        <div class="space-y-4">
          <TransactionField 
            label="Hash" 
            :value="transaction.hash" 
            :copyable="true"
          />
          <div class="space-y-2">
            <Label class="text-gray-400">Status</Label>
            <Badge 
              :variant="transaction.successful ? 'outline' : 'destructive'"
              :class="transaction.successful ? 'bg-green-500/10 text-green-500 border-green-500/20 mx-2' : ''"
            >
              {{ transaction.successful ? 'Successful' : 'Failed' }}
            </Badge>
          </div>
          <TransactionField 
            label="Created At" 
            :value="formatDate(transaction.createdAt)"
          />
          <TransactionField 
            label="Ledger" 
            :value="transaction.ledger.toString()"
          />
        </div>

        <!-- Right Column -->
        <div class="space-y-4">
          <TransactionField 
            label="Source Account" 
            :value="transaction.sourceAccount" 
            :copyable="true"
          />
          <TransactionField 
            label="Fee Charged" 
            :value="transaction.feeCharged"
          />
          <TransactionField 
            label="Operation Count" 
            :value="transaction.operationCount.toString()"
          />
          <TransactionField 
            label="Memo Type" 
            :value="transaction.memoType"
          />
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import type { Transaction } from '@/features/transaction/model'

defineProps<{
  transaction: Transaction
}>()

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString("pt-BR")
}
</script>