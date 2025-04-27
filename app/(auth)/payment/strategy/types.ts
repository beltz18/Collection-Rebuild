export type Status = 'active' | 'inactive'

export interface ColumnEx {
  uid: string
  name: string
  sortable?: boolean
}

export interface PaymentStrategyEx {
  id: number
  name: string
  status: Status
  company: number | null
  store: string | null
  days_before_due: number
  strict_mode: boolean
  is_default: boolean
  create_date?: string
  update_date?: string
  branch?: number | null
}

export type TableData<T = PaymentStrategyEx> = {
  columns: ColumnEx[]
  data: T[]
}
