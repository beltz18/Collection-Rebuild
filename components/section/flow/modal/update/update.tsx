import { 
  Modal, 
  ModalContent, 
  ModalBody, 
  ModalFooter 
} from '@sec/modal'
import { Button } from '@com/index'
import { CircleHelpIcon } from 'lucide-react'
import { DeleteConfirmationModalProps } from '@sec/flow/elements/types'
import { AnimatedButtonIcon } from '../add/button-animated'

export default function MakeRevokeConfirmationModal({
  isOpen,
  onClose,
  selectedCount,
  onConfirm,
  isSubmit=false,
  title = 'Deactivate',
  actionText = 'deactivate',
  entityName = 'processor',
}: DeleteConfirmationModalProps) {
  const entityText = selectedCount === 1 ? entityName : `${entityName}s`
  const titleText = `${title} basic ${entityText}?`

  const handleConfirm = async () => {
    onConfirm()
    onClose()
  }

  return (
    <Modal
      isOpen={ isOpen }
      onClose={ onClose }
      size='md'
      hideCloseButton
      classNames={{
        backdrop: 'bg-[#292f46]/50 backdrop-opacity-40 z-[9999]',
        wrapper: 'z-[9999]',
        base: 'z-[9999] rounded-3xl max-w-xl mx-auto',
      }}
    >
      <ModalContent className='rounded-3xl'>
        {() => (
          <>
            <ModalBody className='gap-5 py-8 px-12 text-center'>
              <div className='mx-auto flex justify-center'>
                <div className='rounded-full bg-red-100 p-5'>
                  <CircleHelpIcon className='text-orange-500 h-10 w-10' />
                </div>
              </div>

              <h2 className='text-2xl font-semibold text-gray-900'>
                { titleText }
              </h2>

              <div className='space-y-2 text-center text-gray-700'>
                <p>
                  {
                    actionText === 'make'
                      ?
                    `Are you sure you want to ${actionText} the selected ${entityName} as basic?`
                      :
                    `Are you sure you want to ${actionText} this basic ${entityName}?`
                  }
                </p>

                <p className='text-gray-500'>
                  {
                    actionText === 'make'
                      ?
                    'If you do this, you will not be able to add new steps.'
                      :
                    'You will be able to create steps again.'
                  }
                </p>
              </div>
            </ModalBody>

            <ModalFooter className='px-6 pb-8 pt-0 flex gap-3 justify-center'>
              <Button
                className='bg-default-500/15 text-default-700 rounded-xl py-6 px-8 font-medium min-w-[120px]'
                onPress={ onClose }
                placeholder='Cancel'
              >
                Cancel
              </Button>

              <Button
                className='bg-orange-500 text-white rounded-xl py-6 px-8 font-medium min-w-[120px]'
                onPress={ handleConfirm }
                startContent={ <AnimatedButtonIcon isSubmitting={ isSubmit } /> }
                placeholder={ isSubmit ? 'Updating...' : title }
              />
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}