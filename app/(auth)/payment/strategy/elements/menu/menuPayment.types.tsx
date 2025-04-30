export interface MenuPaymentProps {
  title?: string
  selectedCount?: number
  filters: {
    status: string
    default: string
    company_id: string
    branch_id: string
    days_before_due_to_start: string
    strict_mode: string
  }
  setFilters: React.Dispatch<React.SetStateAction<MenuPaymentProps['filters']>>
  applyFilters?: () => void
}

export interface FiltersProps {
  filters: {
    status: string
    default: string
    company_id: string
    branch_id: string
    days_before_due_to_start: string
    strict_mode: string
  }
  setFilters: React.Dispatch<React.SetStateAction<FiltersProps['filters']>>
  onApplyFilters?: () => void
}
