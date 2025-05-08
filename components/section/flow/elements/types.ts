import {
  Dispatch,
  SetStateAction,
} from 'react'

export type ModalTypeProps = {
  modal: 'edit' | 'delete' | 'make' | 'revoke'
  id?: number
}

export type ContextMenuProps = {
  setModalType: Dispatch<SetStateAction<ModalTypeProps | null>>
  setSelectedType: Dispatch<SetStateAction<'step' | 'strategy' | null>>
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export interface DeleteConfirmationModalProps {
  isOpen: boolean
  onClose: VoidFunction
  selectedCount: number
  onConfirm: VoidFunction
  title?: string
  actionText?: string
  entityName?: string
}

export type ModalProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  id?: number
}