import {
  CACHE_KEYS,
  METHODS,
  API_ROUTES,
} from '@api/cache'
import {
  useCollectionQuery,
  genericAuthRequest,
} from '@api/config'
import { StrategyT } from '@typ/strategy'

type StrategiesResponse = StrategyT[]

export const useGetStrategies = (token: string | null) => {
  return useCollectionQuery<StrategiesResponse>({
    fetcher: async () => await genericAuthRequest(METHODS.get,
      API_ROUTES.strategy, {},
      token ? { Authorization: `Bearer ${token}` } : undefined
    ),
    queryKey: [CACHE_KEYS.getStrategies],
  })
}