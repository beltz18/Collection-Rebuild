export type UserEx = {
  id: number
  name: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  status: 'active' | 'paused' | 'deleted'
}

export type ColumnEx = {
  uid: string
  name: string
}