import type { SelectProps as SelectT } from '@heroui/select'
import type { SelectItemProps as SelectItemT } from '@heroui/select'

export interface SelectProps extends SelectT {
  className?: string
  itemsSelect?: string[]
}

export interface SelectItemProps extends SelectItemT {
  item: string
}
