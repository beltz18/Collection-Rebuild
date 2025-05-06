import {
  CACHE_KEYS,
  API_ROUTES,
  METHODS,
} from '@api/cache'
import {
  useCollectionMutation,
  genericAuthRequest,
} from '@api/config'
import {
  Step,
  StepResponse,
} from '@typ/strategy'

export const useCreateNewStep = (token: string | null) => {
  return useCollectionMutation<Step, StepResponse>({
    fetcher: async (data) =>
      await genericAuthRequest(
        METHODS.post,
        API_ROUTES.steps, { ...data },
        token ? { Authorization: `Bearer ${token}` } : undefined,
      )
  })
}