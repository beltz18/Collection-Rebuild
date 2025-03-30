'use client'

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react'
import { DropdownProps, DropdownTriggerProps, DropdownMenuProps, DropdownItemProps } from './dropdown.types'
import React from 'react'

const CustomDropdownTrigger = ({ children }: DropdownTriggerProps) => {
  return <DropdownTrigger>{children}</DropdownTrigger>
}

const CustomDropdownMenu = ({ children, className }: DropdownMenuProps) => {
  return (
    <DropdownMenu className={className} >
      {children}
    </DropdownMenu>
  )
}

export const CustomDropdown = ({ children, className }: DropdownProps) => {
  return <Dropdown className={className}>{children}</Dropdown>
}

CustomDropdown.Menu = CustomDropdownMenu
CustomDropdown.Trigger = CustomDropdownTrigger
CustomDropdown.Item = DropdownItem
