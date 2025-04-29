export interface StrategyT {
  active: boolean,
  branch: number | null
  company: number | null
  create_date: Date | string | null
  days_before_due_to_start: number | null
  default: boolean
  id: number
  name: string
  strict_mode: boolean
  update_date: Date | string | null
}

export interface StepT {
  id: number
  create_date: Date | string | null
  update_date: Date | string | null
  active: boolean
  strategy: number
  method: number
  processor: number
  order: number
  attempts: number
  min_hours_between_attempts: number
  min_hours_before_next_step: number | null
  is_basic_step: boolean
}