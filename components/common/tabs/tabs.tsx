'use client'

import {
  Tabs as DefaultTabs,
  Tab,
} from '@heroui/react'
import { TabsProps } from './tabs.types'
import React from 'react'
import { useTheme } from '@ctx/themeContext'

export const Tabs = ({ children, className, ...props }: TabsProps) => {
  const { theme } = useTheme()

  const variants: Record<string, 'default' | 'secondary' | 'primary' | 'danger'> = {
    light: 'default',
    dark: 'secondary',
    blue: 'primary',
    red: 'danger',
  }

  return (
    <DefaultTabs
      variant='underlined'
      color={ variants[theme] ?? 'primary' }
      className={`${className}`}
      { ...props }
    >
      { children }
    </DefaultTabs>
  )
}

Tabs.Tab = Tab