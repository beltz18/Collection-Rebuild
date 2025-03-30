'use client'

import { Popover, PopoverTrigger, PopoverContent } from '@heroui/react'
import { PopoverProps, PopoverTriggerProps, PopoverContentProps } from './popover.types'
import React from 'react'

const CustomPopoverTrigger = ({ children, className, ...props }: PopoverTriggerProps) => {
  return (
    <PopoverTrigger className={`${className}`} {...props}>
      {children}
    </PopoverTrigger>
  )
}

const CustomPopoverContent = ({ children, className, ...props }: PopoverContentProps) => {
  return (
    <PopoverContent className={className} {...props}>
      {children}
    </PopoverContent>
  )
}

export const CustomPopover = ({ children, className, ...props }: PopoverProps) => {
  return (
    <Popover className={`${className}`} {...props}>
      {children}
    </Popover>
  )
}

CustomPopover.Content = CustomPopoverContent
CustomPopover.Trigger = CustomPopoverTrigger
