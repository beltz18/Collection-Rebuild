import type { CheckboxProps as CheckT } from '@heroui/checkbox'

export interface CheckboxProps extends CheckT {
  children: React.ReactNode
  className?: string
}
