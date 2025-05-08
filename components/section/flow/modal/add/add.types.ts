export interface FormData {
  strategy: number
  order: number
  active: boolean
  is_basic_step: boolean
  method: {
    id: number
    name: string
  }
  processor: {
    id: number
    name: string
  }
  attempts: number
  minHoursBetweenAttempts: number
  minHoursBeforeNextStep: number
}

export interface AddNodeModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd?: (nodeData: any) => void
  currentStrategyId: number
  nextStepOrder: number
  strategyName: string
}