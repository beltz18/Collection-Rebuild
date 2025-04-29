import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  StrategyT,
  StepT,
} from '@typ/strategy'

type Props = {
  strategy: StrategyT | undefined
  steps: StepT[] | undefined
  setStrategy: (s: StrategyT) => void
  setSteps: (s: StepT[] | undefined) => void
  clearData: VoidFunction
}

export const useFlowStore = create<Props>()(
  persist(
    (set) => ({
      strategy: undefined,
      steps: undefined,
      setStrategy: (s) => set({ strategy: s }),
      setSteps: (s) => set({ steps: s }),
      clearData: () => set({
        strategy: undefined,
        steps: undefined,
      }),
    }),
    { name: 'steps-storage' }
  )
)