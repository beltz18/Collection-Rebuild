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
  FilterStrategiesProps,
  StrategiesResponse,
  FilterStepsProps,
  SendStrategiesProps,
  StrategiesResponseProps,
  StrategiesUpdateResponseProps,
} from '@typ/strategy'
import { StepT } from '@typ/strategy'


export const useGetStrategies = (token: string | null, filters?: FilterStrategiesProps) => {
  return useCollectionQuery<StrategiesResponse>({
    fetcher: async () => await genericAuthRequest(
      METHODS.get, API_ROUTES.strategy, { ...filters },
      token ? { Authorization: `Bearer ${token}` } : undefined,
    ),
    queryKey: [CACHE_KEYS.getStrategies, filters],
  })
}

export const useGetSteps = (
  token: string | null,
  filters?: FilterStepsProps,
  options?: { enabled: boolean },
) => {
  return useCollectionQuery<StepT[]>({
    fetcher: async () => await genericAuthRequest(
      METHODS.get, API_ROUTES.steps, { ...filters },
      token ? { Authorization: `Bearer ${token}` } : undefined,
    ),
    queryKey: [CACHE_KEYS.getSteps, filters?.strategy_id],
    ...options,
  })
}

export const usePostStrategies = (token: string | null) => {
  return useCollectionMutation<SendStrategiesProps, StrategiesResponseProps>({
    fetcher: async (data) =>
      await genericAuthRequest(
        METHODS.post, API_ROUTES.strategy, data,
        token ? { Authorization: `Bearer ${token}` } : undefined,
      )
  })
}

export const useUpdateStrategies = (token: string | null, strategyId: number | undefined) => {
  return useCollectionMutation<SendStrategiesProps, StrategiesUpdateResponseProps>({
    fetcher: async (data) => await genericAuthRequest(
      METHODS.patch, API_ROUTES.updateStrategy(strategyId), { ...data },
      token ? { Authorization: `Bearer ${token}` } : undefined,
    )
  })
}