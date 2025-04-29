import { 
  type ModalProps,
  type DrawerProps as HeroDrawerProps, 
}  from '@heroui/react'
import type { ReactNode } from 'react'

export type DrawerPlacement = "left" | "right" | "top" | "bottom"
export type DrawerSize = "xs" | "sm" | "md" | "lg" | "xl" | "full" | "2xl" | "3xl" | "4xl" | "5xl"

export interface CustomDrawerProps {
  isOpen: boolean
  onClose: () => void
  title?: ReactNode
  children: ReactNode
  footer?: ReactNode
  placement?: DrawerPlacement
  size?: DrawerSize
  backdrop?: "transparent" | "blur" | "opaque" | boolean
  scrollBehavior?: "inside" | "outside"
  hideCloseButton?: boolean
  showCloseButtonInHeader?: boolean
  isDismissable?: boolean
  className?: string
  headerClassName?: string
  bodyClassName?: string
  footerClassName?: string
  closeButtonClassName?: string
  motionProps?: ModalProps["motionProps"]
  drawerProps?: Partial<HeroDrawerProps>
}