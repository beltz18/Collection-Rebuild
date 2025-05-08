import DeleteConfirmationModal from './delete'
import { ModalProps } from '@sec/flow/elements/types'

export const DeleteStepModal = ({
  open,
  setOpen,
}: ModalProps) => {
  return (
    <DeleteConfirmationModal
      isOpen={ open }
      onClose={() => setOpen(false)}
      selectedCount={ 1 }
      onConfirm={() => console.log('deleted')}
      title='Delete'
      actionText='delete'
      entityName='step'
    />
  )
}