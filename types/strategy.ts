export interface StrategyT {
  active: boolean,
  branch: number | string | null
  company: number | string | null
  create_date: Date | string | null
  days_before_due_to_start: number | null
  default: boolean
  id: number
  name: string
  strict_mode: boolean
  update_date: Date | string | null
  order?: number
  is_basic_step?: boolean
}

export interface Strategy {
  id: string
  name: string
  active: boolean
  company: any
  branch: any
  company_id?: string | number
  branch_id?: string | number
  days_before_due: number
  strict_mode: boolean
  default: boolean
  store?: string
  client_id?: string
  location_id?: string
  sec_code?: string
  use_same_day_ach?: boolean
  enabled_for_lender_web?: boolean
  days_before_due_to_start?: number
}

export interface StepT {
  id: number
  create_date: Date | string | null
  update_date: Date | string | null
  active: boolean
  strategy: number
  method: number | string
  processor: number | string
  order: number
  attempts: number
  min_hours_between_attempts: number
  min_hours_before_next_step: number | null
  is_basic_step: boolean
}