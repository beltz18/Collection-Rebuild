import {
  CACHE_KEYS,
  METHODS,
  API_ROUTES,
} from '@api/cache'
import {
  useCollectionQuery,
  genericAuthRequest,
  useCollectionMutation
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

type SendProps = {
  active?: boolean
  default?: boolean
  name: string
  days_before_due_to_start?: string
  strict_mode?: boolean
  company?: number
  branch?: number
}

type ResponseProps = {
  data: StrategyT,
  message: string
}

export const usePostStrategies = (token: string | null) => {
  return useCollectionMutation<SendProps, ResponseProps>({
    fetcher: async (data) =>
      await genericAuthRequest(
        METHODS.post, 
        API_ROUTES.strategy, data,
        token ? { Authorization: `Bearer ${token}` } : undefined,
      )
  })
}