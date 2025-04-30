export interface MenuPaymentProps {
  title?: string
  selectedCount?: number
  filters: {
    status: string
    processorType: string
    secCodes: string
    useSameDayAch: string
    uniqueNames: string
  }
  setFilters: React.Dispatch<React.SetStateAction<MenuPaymentProps['filters']>>
  applyFilters?: () => void
}

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
}
