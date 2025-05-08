export interface Company {
  company_id: number | null
  name?: string 
  alternate_name?: string
  acronym?: string
  code?: string
  active?: boolean
  rnc?: string
  main_email?: string
  risk_level?: string
  risk_value?: number
  create_date?: string
  update_date?: string
}

export interface Branch {
  branch_id: number | null
  company?: number | null
  name?: string
  default?: boolean
  active?: boolean
  responsible_name?: string
  create_date?: string
  update_date?: string
}