import { Payment } from '@typ/home-tables'
import {
  CACHE_KEYS,
  METHODS,
  API_ROUTES,
} from '@api/cache'
import {
  useCollectionQuery,
  genericAuthRequest,
} from '@api/config'
import {
  FilterProps,
  PaymentResponse,
} from '@typ/payment'

export const useGetPayments = (token: string | null, filters?: FilterProps) => {
  return useCollectionQuery<PaymentResponse>({
    fetcher: async () => await genericAuthRequest(
      METHODS.get, API_ROUTES.payment, { ...filters },
      token ? { Authorization: `Bearer ${token}` } : undefined,
    ),
    queryKey: [CACHE_KEYS.getPayments, filters],
  })
}