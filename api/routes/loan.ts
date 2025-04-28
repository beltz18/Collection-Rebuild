import { CACHE_KEYS } from '@api/cache'
import { Loan } from '@typ/home-tables'
import {
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

type LoanResponse = {
  count: number
  next: string | null
  previous: string | null
  results: Loan[]
}

export const useGetLoans = (token: string | null, filters?: FilterProps) => {
  return useCollectionQuery<LoanResponse>({
    fetcher: async () => await genericAuthRequest(METHODS.get, API_ROUTES.loan,
      { ...filters },
      token ? { Authorization: `Bearer ${token}` } : undefined
    ),
    queryKey: [CACHE_KEYS.getLoans, filters],
  })
}

