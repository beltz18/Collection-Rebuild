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