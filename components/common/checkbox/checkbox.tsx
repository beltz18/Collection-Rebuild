'use client'

import { Checkbox } from '@heroui/react'
import React from 'react'
import { CheckboxProps } from './checkbox.types'

export const CustomCheckbox = ({ children, className, ...props }: CheckboxProps) => {
  return (
    <Checkbox className={className} {...props}>
      {children}
    </Checkbox>
  )
}
