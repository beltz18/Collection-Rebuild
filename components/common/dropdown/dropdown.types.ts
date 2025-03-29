import type { ReactNode } from 'react'

export type DropdownProps = {
  children: [ReactNode, ReactNode]
  className?: string
}
export type DropdownTriggerProps = {
  children: ReactNode
}

export type DropdownMenuProps = {
  children: ReactNode
  className?: string
}

export type DropdownItemProps = {
  children: ReactNode
  className?: string
}
