export interface FormData {
  strategy: string
  order: number
  active: boolean
  is_basic_step: boolean
  method: string
  processor: string
  attempts: number
  minHoursBetweenAttempts: number
  minHoursBeforeNextStep: number
}

export interface AddNodeModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd?: (nodeData: any) => void
  currentStrategyId: string
  nextStepOrder: number
  strategyName?: string
}

export interface NodeData {
  label: string
  description: string
  priority: string
  status: string
  strategyData: {
    strategy: string
    order: number
    active: boolean
    isBasicStep: boolean
    isMainStrategy: boolean
    method?: string
    processor?: string
    attempts?: number
    minHoursBetweenAttempts?: number
    minHoursBeforeNextStep?: number
  }
}