import {
  Dispatch,
  SetStateAction,
  ChangeEventHandler,
} from 'react'
import {
  StrategyT,
  StepT,
} from '@typ/strategy'
import { Node } from '@xyflow/react'
import { NodeData } from './node'

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
  isSubmit?: boolean
  title?: string
  actionText?: string
  entityName?: string
}

export type ModalProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  id?: number
  nodes?: Node<NodeData>[]
  setNodes?: Dispatch<SetStateAction<Node<NodeData>[]>>
}

export type RightPanelProps = {
  hasChanges: boolean
  options: { label: string, key: string }[]
  hasBasic: boolean
  current: number | null
  nodes: Node<NodeData>[]
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  onChange: ChangeEventHandler<HTMLSelectElement>
  handleSubmit: (nodes: Node<NodeData>[]) => void
  setHasChanges: Dispatch<SetStateAction<boolean>>
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

export type LeftPanelProps = {
  setData: Dispatch<SetStateAction<[StrategyT, ...StepT[]] | null>>
  setValue: Dispatch<SetStateAction<string | number | null>>
  clearData: VoidFunction
}