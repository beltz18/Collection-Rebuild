import { Strategy } from "@typ/strategy"

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
  onSave?: (strategy: Strategy) => void
  refresh?: () => void
  token?: string | null
}