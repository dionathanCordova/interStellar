import { Account, type AccountDTO, type Balance } from './model'

export const useAccountService = () => {
  const { public: { apiBase } } = useRuntimeConfig()

  /**
   * Fetches an account by its ID
   */
  const getAccountById = async (id: string): Promise<Account | null> => {
    if (!id?.trim()) return null;
        
    try {
      const data = await $fetch<AccountDTO>(`/accounts/${id}`, { 
        baseURL: apiBase,
        // Adiciona tratamento de erro melhorado
        onResponseError: (error) => {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          console.error(`Error fetching wallet with ID "${id}":`, error);
          throw new Error(`Failed to fetch wallet: ${error.response?._data?.detail || errorMessage}`);
        }
      })
      
      // Converte o DTO para a instância do modelo (camelCase)
      return data ? Account.fromDTO(data) : null;
    } catch (error) {
      throw error
    }
  }

  /**
   * Get all balances for an account
   */
  const getAccountBalances = async (accountId: string): Promise<Balance[] | null> => {
    const account = await getAccountById(accountId)
    return account?.balances || null
  }

  return {
    getAccountById,
    getAccountBalances
  }
}