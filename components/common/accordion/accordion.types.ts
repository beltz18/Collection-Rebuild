import type { AccordionProps as AccordionT } from '@heroui/accordion'

export interface AccordionProps extends AccordionT {
  children: React.ReactElement[] | React.ReactElement
  className?: string
}