export type Status = 'active' | 'inactive' | 'pending' | 'rejected'

export interface ColumnEx {
  uid: string
  name: string
  sortable?: boolean
}