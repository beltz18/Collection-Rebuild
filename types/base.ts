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

export type Variants = Record<string, 'default' | 'secondary' | 'primary' | 'danger'>

export interface Company {
  company_id: number
  name: string
  alternate_name: string
  acronym: string
  code: string
  active: boolean
  company_agreement: boolean
  rnc: number
  main_email: string
  address: boolean
  url: string
  risk_level: string | null
  risk_value: string | null
  founding_date: Date | string | null
  registry_id: number
  create_date: Date | string | null
  update_date: Date | string | null
}

export interface Branch {
  branch_id: number
  company: number
  name: string
  description: string | null
  default: boolean
  active: boolean
  responsible_name: string | null
  create_date: Date | string | null
  update_date: Date | string | null
}

export interface Method {
  id: number
  name: string
  uses_bank_account: boolean
  actually_charges: boolean
  active: boolean
  create_date: Date | string | null
  update_date: Date | string | null
}