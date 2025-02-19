import { Account, type AccountDTO, type Balance } from './model'

export const useAccountService = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase

  /**
   * Fetches an account by its ID
   */
  const getAccountById = async (accountId: string): Promise<Account | null> => {
    const { data, error } = await useFetch<AccountDTO>(`/accounts/${accountId}`, {
      baseURL,
      key: `account-${accountId}`, // unique key for caching
    })

    if (error.value) {
      console.error(`Error fetching account with ID "${accountId}":`, error.value)
      return null
    }

    return data.value ? Account.fromDTO(data.value) : null
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