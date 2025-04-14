import type { ReactNode } from 'react'

export type DropdownProps = {
  children: ReactNode[]
  className?: string
}
export type DropdownTriggerProps = {
  children: ReactNode
  className?: string
}

export type DropdownMenuProps = {
  children: React.ReactElement[] | React.ReactElement
  className?: string
}

export type DropdownItemProps = {
  children: ReactNode
  key: string
  className?: string
}
