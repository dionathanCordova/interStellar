<!-- components/SearchCard.vue -->
<template>
  <div class="p-6 rounded-xl border border-gray-700 bg-gray-800/50 backdrop-blur-lg shadow-lg">
    <form @submit.prevent="$emit('search', searchQuery)" class="flex flex-col space-y-4">
      <label :for="inputId" class="text-lg font-semibold text-white">
        {{ label }}
      </label>
      <div class="relative">
        <input
          :id="inputId"
          v-model="searchQuery"
          type="text"
          :placeholder="`Enter ${label}`"
          class="w-full p-2 pr-12 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          class="absolute right-0 top-0 h-full px-3 text-blue-500 hover:text-blue-400 transition-colors"
        >
          <Icon name="lucide:search" class="scale-125"/>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true
  }
})

const searchQuery = ref('')
const inputId = computed(() => 
  props.label.toLowerCase().replace(/\s+/g, '-') + '-input'
)
</script>

<!-- components/SearchCard.vue -->
<!-- <template>
  <div class="p-6 rounded-xl border border-gray-700 bg-white/10 backdrop-blur-md shadow-lg">
    <form @submit.prevent="handleSearch" class="flex flex-col space-y-4">
      <label :for="inputId" class="text-lg font-semibold">{{ label }}</label>
      <input
        :id="inputId"
        v-model="searchQuery"
        type="text"
        :placeholder="`Enter ${label}`"
        class="p-2 rounded-md border border-gray-600 bg-gray-800 text-white focus:outline-none focus:border-blue-500"
      />
      <button
        type="submit"
        class="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition"
      >
        Search
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  label: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'search', value: string): void
}>()

const searchQuery = ref('')
const inputId = computed(() =>
  props.label.toLowerCase().replace(/\s+/g, '-') + '-input'
)

function handleSearch() {
  emit('search', searchQuery.value)
}
</script> -->
