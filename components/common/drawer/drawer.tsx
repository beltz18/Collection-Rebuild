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
  motionProps,
  drawerProps,
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement={placement}
      size={typeof size === "number" ? "md" : size}
      backdrop={typeof backdrop === "boolean" ? (backdrop ? "opaque" : "transparent") : backdrop}
      scrollBehavior={scrollBehavior}
      isDismissable={isDismissable}
      hideCloseButton={hideCloseButton || showCloseButtonInHeader}
      motionProps={motionProps}
      classNames={{
        base: cn("", className),
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