export type ModalCtx = {
  isOpen: boolean
  onOpen: () => void
  onClose: VoidFunction
}

export type ModalT = {
  children: React.ReactNode
  className?: string
}