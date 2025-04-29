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

type FilterProps = Partial<{
  page: number
  page_size: number
  search: string
}>

type PaymentResponse = {
  count: number
  next: string | null
  previous: string | null
  results: Payment[]
}

export const useGetPayments = (token: string | null, filters?: FilterProps) => {
  return useCollectionQuery<PaymentResponse>({
    fetcher: async () => await genericAuthRequest(METHODS.get, API_ROUTES.payment,
      { ...filters },
      token ? { Authorization: `Bearer ${token}` } : undefined
    ),
    queryKey: [CACHE_KEYS.getPayments, filters],
  })
}