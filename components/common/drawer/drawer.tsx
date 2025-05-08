"use client"

import type React from "react"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@heroui/react"
import { X } from "lucide-react"
import { cn } from "@uti/cn"
import { CustomDrawerProps } from "./drawer.types"
import { useResponsive } from "@uti/useResponsive"

export const CustomDrawer: React.FC<CustomDrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  placement = "right",
  size = "md",
  backdrop = "opaque",
  scrollBehavior = "inside",
  hideCloseButton = false,
  showCloseButtonInHeader = true,
  isDismissable = true,
  className,
  headerClassName,
  bodyClassName,
  footerClassName,
  closeButtonClassName,
  drawerProps,
}) => {
  const { isMobile } = useResponsive()
  const responsiveSize = isMobile
    ? "full"
    : typeof size === "number"
    ? "md"
    : size as "xs" | "sm" | "md" | "lg" | "xl" | "full" | "2xl" | "3xl" | "4xl" | "5xl" | undefined

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement={placement}
      size={responsiveSize}
      backdrop={typeof backdrop === "boolean" ? (backdrop ? "opaque" : "transparent") : backdrop}
      scrollBehavior={scrollBehavior}
      isDismissable={isDismissable}
      hideCloseButton={hideCloseButton || showCloseButtonInHeader}
      motionProps={{
        variants: {
          enter: {
            opacity: 1,
            x: 0,
          },
          exit: {
            x: 100,
            opacity: 0,
          },
        },
      }}
      classNames={{
        base: cn(
          isMobile
            ? "w-[100%] m-0 rounded-none"
            : "data-[placement=right]:sm:m-2 data-[placement=left]:sm:m-2 rounded-medium",
          className,
        ),
        header: cn("", headerClassName),
        body: cn("", bodyClassName),
        footer: cn("", footerClassName),
      }}
      {...drawerProps}
    >
      <DrawerContent>
        {(onClose) => (
          <>
            {(title || showCloseButtonInHeader) && (
              <DrawerHeader className="flex justify-between items-center">
                {title}
                {showCloseButtonInHeader && !hideCloseButton && (
                  <Button
                    isIconOnly
                    variant="light"
                    onPress={onClose}
                    className={cn("absolute right-4", closeButtonClassName)}
                  >
                    <X size={20} />
                  </Button>
                )}
              </DrawerHeader>
            )}
            <DrawerBody>{children}</DrawerBody>
            {footer && <DrawerFooter>{footer}</DrawerFooter>}
          </>
        )}
      </DrawerContent>
    </Drawer>
  )
}