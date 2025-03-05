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
          :placeholder="placeholder"
          class="w-full p-2 pr-12 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          :disabled="pending"
        />
        <button
          type="submit"
          class="absolute right-0 top-0 h-full px-3 text-blue-500 hover:text-blue-400 transition-colors"
          :disabled="pending"
        >
          <Icon
            v-if="!pending"
            name="lucide:search"
            class="scale-125"
          />
          <Icon
            v-else
            name="lucide:loader-2"
            class="h-5 w-5 animate-spin"
          />
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
  },
  placeholder: {
    type: String,
    default: ''
  },
  pending: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'search'])

const inputId = computed(() => 
  props.label.toLowerCase().replace(/\s+/g, '-') + '-input'
)

// Create a computed property that gets/sets the value using modelValue
const searchQuery = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val)
})
</script>

<style scoped>
/* Para navegadores baseados em Chromium (como Brave, Chrome, Edge) */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  -webkit-text-fill-color: white;
  -webkit-box-shadow: 0 0 0px 1000px #374151 inset; /* cor compatível com bg-gray-700 */
  transition: background-color 5000s ease-in-out 0s;
  caret-color: white;
}

/* Para Firefox */
input:autofill,
input:autofill:hover,
input:autofill:focus {
  box-shadow: 0 0 0px 1000px #374151 inset;
  -webkit-text-fill-color: white;
  color: white;
}

</style>