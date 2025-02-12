import { Transaction, type TransactionDTO } from './model'

export const useTransactionService = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase

  /**
   * Busca uma transação por ID
   */
  const getTransactionById = async (id: string): Promise<Transaction | null> => {
    const { data, error } = await useFetch<TransactionDTO>(`/transactions/${id}`, {
      baseURL,
      key: `transaction-${id}`, // chave única para cache
    })

    if (error.value) {
      console.error(`Erro ao buscar transação com ID "${id}":`, error.value)
      return null
    }

    return data.value ? Transaction.fromDTO(data.value) : null
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
      baseURL,
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
      baseURL,
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
      baseURL,
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
      baseURL,
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