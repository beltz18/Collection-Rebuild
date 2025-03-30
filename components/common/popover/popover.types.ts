import type { ReactNode } from 'react'
import type { PopoverProps as PopoverT, PopoverTriggerProps as PopoverTriggerT, PopoverContentProps as PopoverContentT } from '@heroui/popover'

export interface PopoverProps extends PopoverT {
  className?: string
}
export interface PopoverTriggerProps extends PopoverTriggerT {
  children: ReactNode
}

export interface PopoverContentProps extends PopoverContentT {
  children: React.ReactElement[] | React.ReactElement
  className?: string
}
