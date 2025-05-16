import {
  CACHE_KEYS,
  METHODS,
  API_ROUTES,
} from '@api/cache'
import {
  useCollectionQuery,
  genericAuthRequest,
} from '@api/config'

export const useGetReceipt = (loan_payment_id: number, token: string | null) => {
  return useCollectionQuery<{}>({
    fetcher: async () =>
      await genericAuthRequest(
        METHODS.get,
        API_ROUTES.receipt(loan_payment_id), {loan_payment_id},
        token ? { Authorization: `Bearer ${token}` } : undefined
      ),
    queryKey: [CACHE_KEYS.getReceipt, loan_payment_id],
  })
}