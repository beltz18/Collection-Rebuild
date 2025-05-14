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
  StrategyExtended,
  StepUpdateResponse,
} from '@typ/step'
import { SERVER_URI } from '@uti/var'

export const useCreateNewStep = (token: string | null) => {
  return useCollectionMutation<Step, StepResponse>({
    fetcher: async (data) =>
      await genericAuthRequest(
        METHODS.post, API_ROUTES.steps, { ...data },
        token ? { Authorization: `Bearer ${token}` } : undefined,
      )
  })
}

export const useUpdateStep = (token: string | null, stepId: number | undefined) => {
  return useCollectionMutation<StepExtended, StepUpdateResponse>({
    fetcher: async (data) => await genericAuthRequest(
      METHODS.patch, API_ROUTES.updateStep(stepId), { ...data },
      token ? { Authorization: `Bearer ${token}` } : undefined,
    )
  })
}

// Fecthing without using React Query
export function useUpdateStepsPosition(token: string | null) {
  return async function updateStep(stepId: number, data: StepExtended) {
    const res = await fetch(`${SERVER_URI}${API_ROUTES.updateStep(stepId)}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) throw new Error('Error updating steps data')
    return await res.json()
  }
}

export function useUpdateStrategyPosition(token: string | null) {
  return async function updateStep(strategyId: number, data: StrategyExtended) {
    const res = await fetch(`${SERVER_URI}${API_ROUTES.updateStrategy(strategyId)}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) throw new Error('Error updating strategy data')
    return await res.json()
  }
}