'use client'

import { Tabs as DefaultTabs, Tab } from '@heroui/react'
import { TabsProps } from './tabs.types'
import React from 'react'


export const Tabs = ({ children, className, ...props }: TabsProps) => {
  return (
    <DefaultTabs variant="underlined" color='primary' className={`${className}`} {...props}>
      {children}
    </DefaultTabs>
  )
}

Tabs.Tab = Tab
