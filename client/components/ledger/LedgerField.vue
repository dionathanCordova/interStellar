<template>
  <div class="space-y-2">
    <Label class="text-gray-400">{{ label }}</Label>
    <div class="flex items-center gap-2">
      <span class="text-white">{{ value }}</span>
      <Button
        v-if="copyable"
        variant="ghost"
        size="icon"
        @click="copyToClipboard"
        class="h-4 w-4 bg-transparent hover:bg-transparent"
      >
        <Icon name="lucide:copy" class="h-4 w-4 text-gray-300" />
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

function copyToClipboard() {
  try {
    navigator.clipboard.writeText(props.value)
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