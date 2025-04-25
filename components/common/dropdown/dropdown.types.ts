import type { ReactNode } from 'react'
import { DropdownProps as DropdownT, DropdownTriggerProps as DropdownTriggerT, DropdownMenuProps as DropdownMenuT } from '@heroui/dropdown'

export interface DropdownProps extends DropdownT {
  children: ReactNode[]
  className?: string
}
export interface DropdownTriggerProps extends DropdownTriggerT {
  children: ReactNode
  className?: string
}

export interface DropdownMenuProps extends DropdownMenuT{
  children: React.ReactElement[] | React.ReactElement
  className?: string
}
