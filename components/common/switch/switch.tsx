'use client'

import { Switch } from '@heroui/react'
import React from 'react'
import { SwitchProps } from './switch.types'

export const CustomSwitch = ({ children, className, ...props }: SwitchProps) => {
  return (
    <Switch className={className} {...props}>
      {children}
    </Switch>
  )
}
