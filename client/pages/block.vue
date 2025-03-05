<!-- <template>
  <div class="container mx-auto p-8">
    
    <SearchCard
      label="Ledger Number"
      placeholder="Enter the ledger sequence number or hash"
      :pending="pending"
      @search="onSearch"
      v-model="internalLedger"
    />


    <div v-if="error" class="mt-6">
      <Alert variant="destructive">
        <Icon name="lucide:alert-circle" class="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{{ error }}</AlertDescription>
      </Alert>
    </div>


    <div v-if="ledger" class="mt-6">
      <LedgerDetails :ledger="ledger" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useLedgerService } from '@/features/ledger/service'
import type { Ledger } from '@/features/ledger/model'

const route = useRoute()
const router = useRouter()

// Estado da página
const ledger = ref<Ledger | null>(null)
const error = ref<string | null>(null)
const pending = ref(false)
const internalLedger = ref('')

// Função para buscar o ledger
const { getLedgerById } = useLedgerService()
async function fetchLedger(query: string): Promise<Ledger | null> {
  if (!query.trim()) return null
  const result = await getLedgerById(query)
  return result ? JSON.parse(JSON.stringify(result)) : null
}

// Carregar usando useAsyncData para SSR
const ledgerQuery = computed(() => route.query.ledger as string || '')

const { data: initialLedgerData } = useAsyncData(
  async () => ledgerQuery.value ? await fetchLedger(ledgerQuery.value) : null,
  {
    server: true,
    lazy: false,
    immediate: true,
    watch: [ledgerQuery]
  }
)

// Observar os resultados iniciais
watch(initialLedgerData, (newData) => {
  if (newData) {
    ledger.value = newData
    internalLedger.value = ledgerQuery.value
    error.value = null
  } else if (ledgerQuery.value) {
    error.value = 'Ledger not found or an error occurred'
    internalLedger.value = ledgerQuery.value
  }
}, { immediate: true })

// Configurar o valor inicial ao montar
onMounted(() => {
  internalLedger.value = ledgerQuery.value
})

// Função de pesquisa executada pelo usuário
async function onSearch(query: string) {
  try {
    error.value = null
    pending.value = true
    ledger.value = null
    
    if (!query.trim()) {
      error.value = 'Please enter a ledger sequence number or hash'
      return
    }
    
    // Atualize a URL para refletir a pesquisa
    if (query !== route.query.ledger) {
      await router.replace({ query: { ledger: query } })
      return // A alteração na rota acionará o useAsyncData via watch
    }
    
    const result = await fetchLedger(query)
    
    if (!result) {
      error.value = 'Ledger not found or an error occurred'
      return
    }
    
    ledger.value = result
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'An unexpected error occurred'
  } finally {
    pending.value = false
  }
}
</script> -->

<template>
  <div class="container mx-auto p-8">
    <SearchCard
      label="Ledger Number"
      placeholder="Enter the ledger sequence number or hash"
      :pending="pending"
      @search="onSearch"
      v-model="internalLedger"
    />
    <!-- Exibição de Erro -->
    <div v-if="error" class="mt-6">
      <Alert variant="destructive">
        <Icon name="lucide:alert-circle" class="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{{ error }}</AlertDescription>
      </Alert>
    </div>
    <!-- Ledger Details -->
    <div v-if="ledger" class="mt-6">
      <LedgerDetails :ledger="ledger" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useLedgerService } from '@/features/ledger/service'
import type { Ledger } from '@/features/ledger/model'
import { useRoute, useRouter } from '#imports'

const route = useRoute()
const router = useRouter()

// Estado da página
const ledger = ref<Ledger | null>(null)
const error = ref<string | null>(null)
const pending = ref(false)
const internalLedger = ref('')

const { getLedgerById } = useLedgerService()

// Função para buscar o ledger
async function fetchLedger(query: string): Promise<void> {
  if (!query.trim()) {
    error.value = 'Please enter a ledger sequence number or hash'
    ledger.value = null
    return
  }

  try {
    pending.value = true
    error.value = null
    ledger.value = null

    const result = await getLedgerById(query)
    
    if (!result) {
      error.value = 'Ledger not found or an error occurred'
      return
    }
    
    ledger.value = result
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'An unexpected error occurred'
  } finally {
    pending.value = false
  }
}

// Observa mudanças na query da rota
watch(() => route.query.ledger, async (newLedgerQuery) => {
  if (newLedgerQuery) {
    internalLedger.value = newLedgerQuery as string
    await fetchLedger(newLedgerQuery as string)
  } else {
    // Limpa os dados quando não há query
    ledger.value = null
    error.value = null
  }
}, { immediate: true })

// Define o valor inicial do campo de pesquisa com base na URL
onMounted(() => {
  if (route.query.ledger) {
    internalLedger.value = route.query.ledger as string
  }
})

// Função de pesquisa acionada pelo usuário
async function onSearch(query: string) {
  // Atualiza a URL com o parâmetro de pesquisa
  await router.replace({ query: { ledger: query } })
  // O watcher acima já cuidará de buscar os dados
}
</script>