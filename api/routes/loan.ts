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
  LoanResponse,
} from '@typ/loan'

export const useGetLoans = (token: string | null, filters?: FilterProps) => {
  return useCollectionQuery<LoanResponse>({
    fetcher: async () => await genericAuthRequest(
      METHODS.get, API_ROUTES.loan, { ...filters },
      token ? { Authorization: `Bearer ${token}` } : undefined,
    ),
    queryKey: [CACHE_KEYS.getLoans, filters],
  })
}