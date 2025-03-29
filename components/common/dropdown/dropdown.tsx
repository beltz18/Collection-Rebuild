'use client'

import { Dropdown as HeadlessDropdown } from '@heroui/react'
import { DropdownProps, DropdownTriggerProps, DropdownMenuProps, DropdownItemProps } from './dropdown.types'

export const CustomDropdown = ({ children, className }: DropdownProps) => {
  return <HeadlessDropdown className={className}>{children}</HeadlessDropdown>
}

export const DropdownTrigger = ({ children }: DropdownTriggerProps) => {
  return <>{children}</>
}

export const DropdownMenu = ({ children, className }: DropdownMenuProps) => {
  return <div className={className}>{children}</div>
}

export const DropdownItem = ({ children, className }: DropdownItemProps) => {
  return <div className={className}>{children}</div>
}

CustomDropdown.Trigger = DropdownTrigger
CustomDropdown.Menu = DropdownMenu
CustomDropdown.Item = DropdownItem
