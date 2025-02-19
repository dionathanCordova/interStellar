<!-- components/transaction/TransactionField.vue -->
<template>
  <div class="space-y-2">
    <Label class="text-gray-400">{{ label }}</Label>
    <div class="flex items-center space-x-2">
      <p class="text-sm text-white break-all">{{ value }}</p>
      <Button 
        v-if="copyable"
        variant="secondary"
        size="icon"
        class="h-4 w-4 bg-transparent hover:bg-transparent"
        @click="copyToClipboard(value)"
      >
        <Icon name="lucide:copy" size="16" class="text-gray-300"/>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '@/components/ui/toast'

const props = defineProps<{
  label: string
  value: string
  copyable?: boolean
}>()

const { toast } = useToast()

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard",
      variant: "default",
    })
  } catch (e) {
    toast({
      title: "Error",
      description: "Failed to copy text",
      variant: "destructive",
    })
  }
}
</script>