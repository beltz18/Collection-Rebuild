'use client'

import { Select, SelectItem } from '@heroui/react'
import React from 'react'
import { SelectProps } from './select.types'

export const CustomSelect = ({ className, label, itemsSelect }: SelectProps) => {
  return (
    itemsSelect && (
      <Select className={className} label={label}>
        {itemsSelect.map((item, index) => (
          <SelectItem key={index}>{item}</SelectItem>
        ))}
      </Select>
    )
  )
}
