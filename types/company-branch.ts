export interface Company {
  company_id: number | null
  name?: string 
  alternate_name?: string
  acronym?: string
  code?: string
  active?: boolean
  rnc?: number
  main_email?: string
  risk_level?: number | null
  risk_value?: string
  create_date?: string
  update_date?: string
  address?: boolean
  company_agreement?: boolean
  founding_date?: string
  registry_id?: number
  url?: string
}

export interface Branch {
  branch_id: number | null
  company?: number | null
  name?: string
  default?: boolean
  active?: boolean
  responsible_name?: string | null
  create_date?: string | Date | null
  update_date?: string | Date | null
}