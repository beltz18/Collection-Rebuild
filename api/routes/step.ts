import {
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
import {
  StepExtended,
  StepUpdateResponse,
} from '@typ/step'

export const useCreateNewStep = (token: string | null) => {
  return useCollectionMutation<Step, StepResponse>({
    fetcher: async (data) =>
      await genericAuthRequest(
        METHODS.post, API_ROUTES.steps, { ...data },
        token ? { Authorization: `Bearer ${token}` } : undefined,
      )
  })
}

export const useUpdateStep = (token: string, stepId: number) => {
  return useCollectionMutation<StepExtended, StepUpdateResponse>({
    fetcher: async (data) => await genericAuthRequest(
      METHODS.patch, API_ROUTES.updateStep(stepId), { ...data },
      token ? { Authorization: `Bearer ${token}` } : undefined,
    )
  })
}