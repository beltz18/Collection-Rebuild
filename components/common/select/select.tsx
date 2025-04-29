'use client'

import {
  Select,
  SelectItem,
} from '@heroui/react'
import React from 'react'
import { SelectProps } from './select.types'

export const CustomSelect = ({
  className,
  label,
  values,
  ...props
}: SelectProps) => {
  return (
    values && (
      <Select
        className={ className }
        label={ label }
        {...props}
      >
        {
          values.map((val) => (
            <SelectItem key={ val.key }>{ val.label }</SelectItem>
          ))
        }
      </Select>
    )
  )
}