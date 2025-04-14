'use client'

import { Accordion, AccordionItem } from '@heroui/react'
import { AccordionProps } from './accordion.types'
import React from 'react'

export const CustomAccordion = ({ children, className, ...props }: AccordionProps) => {
  return (
    <Accordion className={className} {...props}>
      {children}
    </Accordion>
  )
}

CustomAccordion.Item = AccordionItem