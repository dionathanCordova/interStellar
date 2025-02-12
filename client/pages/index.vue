<!-- components/WelcomePage.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    <div class="container mx-auto px-4 py-16">
      <div class="max-w-5xl mx-auto text-center">
        <!-- Logo Section -->
        <!-- <div class="mb-12 animate-fade-in">
          <div class="inline-flex items-center space-x-3 bg-gray-800/50 backdrop-blur-lg px-6 py-3 rounded-full border border-gray-700">
            <Icon name="lucide:terminal" class="h-8 w-8 text-blue-400" />
            <span class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Blockchain Explorer
            </span>
          </div>
        </div> -->

        <!-- Main Content -->
        <div class="glass-container p-8 rounded-2xl border border-gray-700/50 backdrop-blur-lg">
          <h1 class="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Explore the Stellar Blockchain
          </h1>
          
          <p class="text-gray-300 text-lg mb-8">
            Discover blocks, transactions and wallet activities on the blockchain
          </p>

          <!-- Search Card -->
          <SearchCard label="Block Number" class="max-w-3xl mx-auto" />

          <SearchCard label="Transaction Hash" class="max-w-3xl mx-auto my-5" />

          <SearchCard label="Wallet Address" class="max-w-3xl mx-auto" />
        </div>

        <!-- Feature Grid -->
        <!-- <div class="grid md:grid-cols-3 gap-6 mt-12">
          <FeatureCard
            v-for="(feature, index) in features"
            :key="index"
            :title="feature.title"
            :description="feature.description"
            :icon="feature.icon"
          />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import FeaturedCard from '~/components/FeaturedCard.vue';
// const features = [
//   {
//     title: "Real-time Data",
//     description: "Get up-to-date blockchain information",
//     icon: "lucide:zap"
//   },
//   {
//     title: "Secure Access",
//     description: "Encrypted and safe transactions",
//     icon: "lucide:shield-check"
//   },
//   {
//     title: "Open Source",
//     description: "Transparent and community-driven",
//     icon: "lucide:github"
//   }
// ]
</script>

<style>
.glass-container {
  background: rgba(39, 39, 42, 0.25); /* bg-gray-800/50 */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* .modern-button {
  @apply inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-medium transition-all duration-300;
  @apply transform hover:scale-[1.02] hover:shadow-lg active:scale-95;
  @apply border border-transparent hover:border-white/10;
} */

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>