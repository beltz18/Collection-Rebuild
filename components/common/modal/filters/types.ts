import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

export type FilterValue = string | number | boolean | DateRange | undefined | null

export type FilterOptions<T extends Record<string, FilterValue> = Record<string, FilterValue>> = T

export type FilterOption<T extends Record<string, FilterValue> = Record<string, FilterValue>> = {
  id: string
  key: keyof T
  label: string
  icon: LucideIcon
  component: (props: FilterContentItemProps<T>) => ReactNode
}

export interface FilterContentItemProps<T extends Record<string, FilterValue>> {
  filter: FilterOption<T>
  values: T
  onChange: (key: keyof T, value: FilterValue) => void
}

export interface FilterSidebarProps<T extends Record<string, FilterValue>> {
  filterOptions: FilterOption<T>[]
  activeFilter: string | null
  setActiveFilter: (filter: string | null) => void
  filters: T
}

export interface FilterContentProps<T extends Record<string, FilterValue>> {
  activeFilter: string | null
  filterOptions: FilterOption<T>[]
  filters: T
  handleInputChange: (key: keyof T, value: FilterValue) => void
}

export interface FilterDialogProps<T extends Record<string, FilterValue>> {
  isOpen: boolean
  onClose: () => void
  onApplyFilters?: (filters: T) => void
  filterOptions: FilterOption<T>[]
  initialFilters?: Partial<T>
}

export interface FilterModalProps<T extends Record<string, FilterValue>> {
  filterOptions: FilterOption<T>[]
  initialFilters?: Partial<T>
  onFiltersApplied?: (filters: T) => void
  buttonLabel?: string
}