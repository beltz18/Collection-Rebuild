'use client'

import { Select, SelectItem } from '@heroui/react'
import React from 'react'
import { SelectProps } from './select.types'

export const CustomSelect = ({ children, className, label, placeholder }: SelectProps) => {
  const items =
    React.Children.map(children, (child, index) => ({
      id: `item-${index}`,
      element: child,
    })) || []
  return (
    <Select className={className} label={label} placeholder={placeholder} items={items}>
      {(item) => <SelectItem key={item.id}>{item.element}</SelectItem>}
    </Select>
  )
}
