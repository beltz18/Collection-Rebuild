'use client'

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react'
import { DropdownProps, DropdownTriggerProps, DropdownMenuProps, DropdownItemProps } from './dropdown.types'
import React from 'react'

// Define the subcomponents first
const CustomDropdownTrigger = ({ children }: DropdownTriggerProps) => {
  return <DropdownTrigger>{children}</DropdownTrigger>
}

const CustomDropdownMenu = ({ children, className }: DropdownMenuProps) => {
  const items =
    React.Children.map(children, (child, index) => ({
      id: `item-${index}`,
      element: child,
    })) || []

  return (
    <DropdownMenu className={className} items={items}>
      {(item) => <DropdownItem key={item.id}>{item.element}</DropdownItem>}
    </DropdownMenu>
  )
}

export const CustomDropdown = ({ children, className }: DropdownProps) => {
  return <Dropdown className={className}>{children}</Dropdown>
}

CustomDropdown.Menu = CustomDropdownMenu
CustomDropdown.Trigger = CustomDropdownTrigger
