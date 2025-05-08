import {
  Dispatch,
  SetStateAction,
} from 'react'
import { DeleteStepModal } from './delete/delete-step'
import { DeleteStrategyModal } from './delete/delete-strategy'
import { MakeBasicStepModal } from './update/make-step'
import { RevokeBasicStepModal } from './update/revoke-step'
import { EditStepModal } from './update/edit-step'
import { ModalTypeProps } from '../elements/types'
import { Node } from '@xyflow/react'
import { NodeData } from '../elements/node'

type Props = {
  modalType: ModalTypeProps | null
  selectedType: 'step' | 'strategy' | null
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  nodes: Node<NodeData>[]
  setNodes: Dispatch<SetStateAction<Node<NodeData>[]>>
}

export const ManagerModals = ({
  modalType,
  selectedType,
  isOpen,
  nodes,
  setIsOpen,
  setNodes,
}: Props) => {
  if (modalType?.modal == 'delete') {
    if (selectedType == 'step') {
      return (
        <DeleteStepModal
          open={ isOpen }
          setOpen={ setIsOpen }
        />
      )
    } else if (selectedType == 'strategy') {
      return (
        <DeleteStrategyModal
          open={ isOpen }
          setOpen={ setIsOpen }
        />
      )
    }
  } else if (modalType?.modal == 'make' && selectedType == 'step') {
    return (
      <MakeBasicStepModal
        open={ isOpen }
        setOpen={ setIsOpen }
      />
    )
  } else if (modalType?.modal == 'revoke' && selectedType == 'step') {
    return (
      <RevokeBasicStepModal
        open={ isOpen }
        setOpen={ setIsOpen }
      />
    )
  } else if (modalType?.modal == 'edit') {
    if (selectedType == 'step') {
      return (
        <EditStepModal
          open={ isOpen }
          close={ setIsOpen }
          id={ modalType.id }
          tab='basic'
          nodes={ nodes }
          setNodes={ setNodes }
        />
      )
    } else if (selectedType == 'strategy') {
      return (
        <></>
      )
    }
  }

  return <></>
}