import MakeRevokeConfirmationModal from './update'
import { ModalProps } from '@sec/flow/elements/types'

export const RevokeBasicStepModal = ({
  open,
  setOpen,
}: ModalProps) => {
  return (
    <MakeRevokeConfirmationModal
      isOpen={ open }
      onClose={() => setOpen(false)}
      selectedCount={ 1 }
      onConfirm={() => console.log('deleted')}
      title='Revoke'
      actionText='revoke'
      entityName='step'
    />
  )
}