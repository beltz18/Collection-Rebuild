import type React from 'react'
import type { ReactNode } from 'react'

export interface SidebarContext {
  open: boolean
  setOpen: (open: boolean) => void
}

export interface SidebarNodes {
  children: ReactNode
}

export interface SidebarItems {
  children: ReactNode
  active?: boolean
  expanded?: boolean
  setActive?: VoidFunction
  setExpanded?: VoidFunction
  icon?: ReactNode
  hasChildren?: boolean
  childItems?: any[]
}

export interface SidebarSubItems {
  children: ReactNode
  active?: boolean
  setActive?: VoidFunction
  icon?: ReactNode
  parentExpanded: boolean
}