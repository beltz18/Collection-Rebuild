import { FormData } from './add.types'

export const getInitialFormData = (
  currentStrategyId: number,
  nextStepOrder: number,
): FormData => {
  return {
    strategy: currentStrategyId,
    order: nextStepOrder,
    active: true,
    is_basic_step: false,
    method: 0,
    processor: 0,
    attempts: 3,
    minHoursBetweenAttempts: 24,
    minHoursBeforeNextStep: 0,
  }
}