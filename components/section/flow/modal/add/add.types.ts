export interface FormData {
  strategy: number
  order: number
  active: boolean
  is_basic_step: boolean
  method: number
  processor: number
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