<!-- components/FeatureCard.vue -->
<template>
  <div class="feature-card h-full p-6 rounded-xl border border-gray-700/50 bg-gray-800/25 backdrop-blur-lg hover:bg-gray-800/50 transition-all duration-300">
    <div class="inline-flex items-center mb-4">
      <div class="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
        <Icon name="icon" class="h-6 w-6 text-white" />
      </div>
    </div>
    <h3 class="text-xl font-semibold text-white mb-2">{{ title }}</h3>
    <p class="text-gray-400">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  description: String,
  icon: String
})
</script>