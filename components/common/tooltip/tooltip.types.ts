import React from "react"

export type TooltipContextType = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  refs: {
    setReference: (node: HTMLElement | null) => void
    setFloating: (node: HTMLElement | null) => void
  }
  context: any
  floatingStyles: React.CSSProperties
  arrowRef: React.RefObject<SVGSVGElement>
  getReferenceProps: (props?: any) => any
  getFloatingProps: (props?: any) => any
}

export type TooltipProps = {
  children: React.ReactNode
  defaultOpen?: boolean
  placement?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end"
    | "left-start"
    | "left-end"
    | "right-start"
    | "right-end"
}

export type TriggerProps = {
  children: React.ReactNode
  asChild?: boolean
  className?: string
}

export type ContentProps = {
  children: React.ReactNode
  className?: string
  showArrow?: boolean
  arrowClassName?: string
}