"use client"

import type React from "react"
import { createContext, useContext, useEffect, useId } from "react"
import {
  Modal as HeroModal,
  ModalContent as HeroModalContent,
  ModalHeader as HeroModalHeader,
  ModalBody as HeroModalBody,
  ModalFooter as HeroModalFooter,
  useDisclosure,
  ModalProps
} from "@heroui/react"
import { cn } from "@uti/cn"
import { modalEvents } from "./modal-events"

export type ModalCtx = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  id: string
  modalProps: Partial<ModalProps>
}

export const ModalContext = createContext<ModalCtx | null>(null)

export const useModalContext = () => {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error("Modal must be used within a ModalProvider")
  return ctx
}

export const Modal = ({
  children,
  id: providedId,
  ...modalProps
}: {
  children: React.ReactNode
  id?: string
} & Partial<ModalProps>) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const generatedId = useId()
  const id = providedId || generatedId

  const onClose = () => {
    onOpenChange()
  }

  const contextValue = {
    isOpen,
    onOpen,
    onClose,
    id,
    modalProps,
  }

  useEffect(() => {
    const unsubscribe = modalEvents.on("close", (payload) => {
      if (!payload.id || payload.id === id) {
        onClose()
      }
    })

    const unsubscribeOpen = modalEvents.on("open", (payload) => {
      if (payload.id === id) {
        onOpen()
      }
    })

    return () => {
      unsubscribe()
      unsubscribeOpen()
    }
  }, [id, onOpen])

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>
}

export const ModalTrigger = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
  [key: string]: any
}) => {
  const { onOpen } = useModalContext()

  return (
    <div onClick={onOpen} className={className} {...props}>
      {children}
    </div>
  )
}

export const ModalContent = ({
  children,
  ...customProps
}: {
  children: React.ReactNode | ((onClose: () => void) => React.ReactNode)
  [key: string]: any
}) => {
  const { isOpen, onClose, modalProps } = useModalContext()

  const backdropValue = modalProps.backdrop || customProps.backdrop || "opaque"
  const validBackdrop =
    backdropValue === "opaque" || backdropValue === "transparent" || backdropValue === "blur" ? backdropValue : "opaque"

  const mergedProps = {
    backdrop: validBackdrop,
    ...modalProps,
    ...customProps
  }

  return (
    <HeroModal
      isOpen={isOpen}
      onOpenChange={onClose}
      { ...mergedProps }
    >
      <HeroModalContent>{typeof children === "function" ? children(onClose) : children}</HeroModalContent>
    </HeroModal>
  )
}

export const ModalHeader = ({
  children,
  className,
  ...props
}: {
  children?: React.ReactNode
  className?: string
  [key: string]: any
}) => {
  return (
    <HeroModalHeader
      className={cn("w-full bg-dark text-white h-[2.5rem] p-[.75rem] flex items-center justify-between", className)}
      {...props}
    >
      {children}
    </HeroModalHeader>
  )
}

export { HeroModalBody as ModalBody, HeroModalFooter as ModalFooter }