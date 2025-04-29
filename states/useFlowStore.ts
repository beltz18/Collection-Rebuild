import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Company } from '@typ/base'
import {
  StrategyT,
  StepT,
} from '@typ/strategy'

type Props = {
  strategy: StrategyT | undefined
  steps: StepT[] | undefined
  companies: Company[] | undefined
  setStrategy: (s: StrategyT) => void
  setSteps: (s: StepT[] | undefined) => void
  setCompanies: (s: Company[] | undefined) => void
  clearData: VoidFunction
}

export const useFlowStore = create<Props>()(
  persist(
    (set) => ({
      strategy: undefined,
      steps: undefined,
      companies: undefined,
      setStrategy: (s) => set({ strategy: s }),
      setSteps: (s) => set({ steps: s }),
      setCompanies: (s) => set({ companies: s }),
      clearData: () => set({
        strategy: undefined,
        steps: undefined,
        companies: undefined,
      }),
    }),
    { name: 'steps-storage' }
  )
)