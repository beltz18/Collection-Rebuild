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
  StrategyT,
  StepT,
} from '@typ/strategy'

type StrategiesResponse = StrategyT[]

export const useGetStrategies = (token: string | null) => {
  return useCollectionQuery<StrategiesResponse>({
    fetcher: async () => await genericAuthRequest(METHODS.get,
      API_ROUTES.strategy, { },
      token ? { Authorization: `Bearer ${token}` } : undefined,
    ),
    queryKey: [CACHE_KEYS.getStrategies],
  })
}

type FilterProps = {
  strategy_id: number | undefined
}

export const useGetSteps = (
  token: string | null,
  filters?: FilterProps,
  options?: { enabled: boolean },
) => {
  return useCollectionQuery<StepT[]>({
    fetcher: async () => await genericAuthRequest(METHODS.get,
      API_ROUTES.steps, { ...filters },
      token ? { Authorization: `Bearer ${token}` } : undefined,
    ),
    queryKey: [CACHE_KEYS.getSteps, filters?.strategy_id],
    ...options,
  })
}