import { Ledger, type LedgerDTO } from './model'

export const useLedgerService = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase

  const getLedgerById = async (id: string): Promise<Ledger | null> => {
    const { data, error } = await useFetch<LedgerDTO>(`/ledgers/${id}`, {
      baseURL,
      key: `ledger-${id}`,
    })

    if (error.value) {
      console.error(`Error fetching ledger with ID "${id}":`, error.value)
      return null
    }

    return data.value ? Ledger.fromDTO(data.value) : null
  }

  return {
    getLedgerById
  }
}