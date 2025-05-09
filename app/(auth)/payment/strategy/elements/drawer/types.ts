export interface Strategy {
  active?: boolean
  default?: boolean
  name: string
  days_before_due_to_start?: string | number | undefined
  strict_mode?: boolean
  branch: number
  company: number
  company_id?: string | number
  branch_id?: string | number
}

export interface StrategyFormProps {
  formData: Strategy
  updateFormData: (data: Partial<Strategy>) => void
  isViewMode?: boolean
}

export interface StrategyDrawerProps {
  isOpen: boolean
  onClose: () => void
  isViewMode: "view" | "edit" | "add"
  strategy: Strategy | null
}