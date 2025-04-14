export type ModalCtx = {
  open: boolean
  setOpen: (open: boolean) => void
  closeModal: () => void
}

export type ModalT = {
  children: React.ReactNode
  className?: string
}