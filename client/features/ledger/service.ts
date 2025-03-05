import { Ledger, type LedgerDTO } from './model'

export const useLedgerService = () => {
  const { public: { apiBase } } = useRuntimeConfig()


  const getLedgerById = async (id: string): Promise<Ledger | null> => {
    if (!id?.trim()) return null;
    
    try {
      const data = await $fetch<LedgerDTO>(`/ledgers/${id}`, { 
        baseURL: apiBase,
        // Adiciona tratamento de erro melhorado
        onResponseError: (error) => {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          console.error(`Error fetching ledger with ID "${id}":`, error);
          throw new Error(`Failed to fetch ledger: ${error.response?._data?.detail || errorMessage}`);
        }
      })
      
      // Converte o DTO para a instância do modelo (camelCase)
      return data ? Ledger.fromDTO(data) : null;
    } catch (error) {
      throw error
    }
  }

  return { getLedgerById }
}