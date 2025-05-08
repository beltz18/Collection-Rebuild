export interface StepExtended {
  id: number
  create_date?: Date | string | null
  update_date?: Date | string | null
  active: boolean
  strategy: number
  method: number
  processor: number
  order?: number
  attempts?: number
  min_hours_between_attempts?: number
  min_hours_before_next_step?: number
  is_basic_step?: boolean
  collect_only_on_due_date?: boolean
  is_fallback?: boolean
  fallback_for?: any
  use_regular_ach?: boolean
  admin_config?: any
}

export interface StepUpdateResponse {
  message: string
  data: StepExtended
}