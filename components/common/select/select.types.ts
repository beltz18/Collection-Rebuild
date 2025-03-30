import type { SelectProps as SelectT } from '@heroui/select'

export interface SelectProps extends Omit<SelectT<object>, 'children'> {
  className?: string
  itemsSelect?: string[]
}
