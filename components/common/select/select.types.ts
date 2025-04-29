import type { SelectProps as SelectT } from '@heroui/select'

export type ValueProps = {
  key: string | number
  label: string
}
export interface SelectProps extends Omit<SelectT<object>, 'children'> {
  className?: string
  values: ValueProps[] | null
}