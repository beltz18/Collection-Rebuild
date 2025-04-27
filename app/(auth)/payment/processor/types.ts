export type Status = 'active' | 'inactive' | 'pending' | 'rejected'

export interface ColumnEx {
  uid: string
  name: string
  sortable?: boolean
}

export interface PaymentEx {
  id: number
  name: string
  description: string
  processor_type: string
  status: Status
  store_id: string | null
  client_id: string | null
  location_id: string | null
}
