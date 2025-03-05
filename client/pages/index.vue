<!-- components/WelcomePage.vue -->
<template>
    <div class="container mx-auto px-4 py-16">
      <div class="max-w-5xl mx-auto text-center">

        <!-- Main Content -->
        <div class="glass-container p-8 rounded-2xl border border-gray-700/50 backdrop-blur-lg">
          <h1 class="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Explore the Stellar Blockchain
          </h1>
          
          <p class="text-gray-300 text-lg mb-8">
            Discover blocks, transactions and wallet activities on the blockchain
          </p>

          <!-- Search Card -->
          <SearchCard 
            label="Block Number" 
            placeholder="Enter ledger number"
            class="max-w-3xl mx-auto" 
            @search="searchBlock"
            v-model="blockQuery"
          />
          <SearchCard 
            label="Transaction Hash" 
            placeholder="Enter transaction hash"
            class="max-w-3xl mx-auto my-5" 
            @search="searchTransaction"
            v-model="txQuery"
          />
          <SearchCard 
            label="Wallet Address" 
            placeholder="Enter wallet address"
            class="max-w-3xl mx-auto" 
            @search="searchWallet"
            v-model="walletQuery"
          />
        </div>

      </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const router = useRouter()
const blockQuery = ref('')
const txQuery = ref('')
const walletQuery = ref('')

function searchBlock(query: string) {
  if (!query.trim()) return
  router.push({ path: '/block', query: { ledger: query } })
}

function searchTransaction(query: string) {
  if (!query.trim()) return
  router.push({ path: '/transaction', query: { hash: query } })
}

function searchWallet(query: string) {
  if (!query.trim()) return
  router.push({ 
    path: '/wallet', 
    query: { address: query }
  })
}
</script>

<style>
.glass-container {
  background: rgba(39, 39, 42, 0.25);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}


.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>