import { StrategyT } from "@typ/strategy"

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
  applyFilters?: () => void
}

export interface MenuPaymentProps extends FiltersProps {
  title?: string
  selectedCount?: number
  cells?: StrategyT[]
  input: string | null
  setInput: (input: string) => void
}