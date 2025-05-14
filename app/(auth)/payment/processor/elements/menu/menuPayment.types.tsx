import { ProcessorT } from "@typ/processor"

export interface FiltersProps {
  filters: {
    status: string
    processorType: string
    secCodes: string
    useSameDayAch: string
    uniqueNames: string
  }
  setFilters: React.Dispatch<React.SetStateAction<FiltersProps['filters']>>
  onApplyFilters?: () => void
  applyFilters?: () => void
}

export interface MenuPaymentProps extends FiltersProps {
  title?: string
  selectedCount?: number
  cells?: ProcessorT[]
  input: string | null
  setInput: (input: string) => void
}