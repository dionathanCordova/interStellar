import { Transaction, type TransactionDTO } from './model'

export const useTransactionService = () => {
  const { public: { apiBase } } = useRuntimeConfig()

  const getTransactionById = async (id: string): Promise<Transaction | null> =>{
    if (!id?.trim()) return null;

    try {
      const data = await $fetch<TransactionDTO>(`/transactions/${id}`, {
        baseURL: apiBase,
        onResponseError: (error) => {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          console.error(`Error fetching transaction with ID "${id}":`, error);
          throw new Error(`Failed to fetch transaction: ${error.response?._data?.detail || errorMessage}`);
        }
      })
      return data ? Transaction.fromDTO(data) : null;
    } catch (error) {
      throw error
    }
    }

  /**
   * Busca todas as transações com paginação
   */
  const getTransactions = async (page = 1, limit = 10): Promise<{ 
    transactions: Transaction[], 
    total: number 
  }> => {
    const { data, error } = await useFetch<{ 
      items: TransactionDTO[], 
      total: number 
    }>('/transactions', {
      baseURL: apiBase,
      params: { page, limit },
      key: `transactions-${page}-${limit}`,
    })

    if (error.value) {
      console.error('Erro ao buscar transações:', error.value)
      return { transactions: [], total: 0 }
    }

    return {
      transactions: data.value?.items.map(dto => Transaction.fromDTO(dto)) ?? [],
      total: data.value?.total ?? 0
    }
  }

  /**
   * Busca transações por conta de origem
   */
  const getTransactionsByAccount = async (accountId: string): Promise<Transaction[]> => {
    const { data, error } = await useFetch<TransactionDTO[]>(`/accounts/${accountId}/transactions`, {
      baseURL: apiBase,
      key: `account-transactions-${accountId}`,
    })

    if (error.value) {
      console.error(`Erro ao buscar transações da conta "${accountId}":`, error.value)
      return []
    }

    return data.value?.map(dto => Transaction.fromDTO(dto)) ?? []
  }

  /**
   * Cria uma nova transação
   */
  const createTransaction = async (transaction: Partial<TransactionDTO>): Promise<Transaction | null> => {
    const { data, error } = await useFetch<TransactionDTO>('/transactions', {
      baseURL: apiBase,
      method: 'POST',
      body: transaction,
    })

    if (error.value) {
      console.error('Erro ao criar transação:', error.value)
      return null
    }

    return data.value ? Transaction.fromDTO(data.value) : null
  }

  /**
   * Atualiza o status de uma transação
   */
  const updateTransactionStatus = async (id: string, successful: boolean): Promise<Transaction | null> => {
    const { data, error } = await useFetch<TransactionDTO>(`/transactions/${id}`, {
      baseURL: apiBase,
      method: 'PATCH',
      body: { successful },
    })

    if (error.value) {
      console.error(`Erro ao atualizar status da transação "${id}":`, error.value)
      return null
    }

    return data.value ? Transaction.fromDTO(data.value) : null
  }

  return {
    getTransactionById,
    getTransactions,
    getTransactionsByAccount,
    createTransaction,
    updateTransactionStatus,
  }
}