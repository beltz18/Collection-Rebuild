import {
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'
import {
  Modal,
  ModalContent,
  ModalBody,
} from '@sec/modal'
import { CACHE_KEYS } from '@api/cache'
import { useQueryClient } from '@tanstack/react-query'
import { successToast } from '@com/index'
import { Node } from '@xyflow/react'
import { NodeData } from '@sec/flow/elements/node'
import { CircleAlertIcon } from 'lucide-react'
import { Progress } from '@heroui/react'

type Props = {
  size: number
  open: boolean
  nodes: Node<NodeData>[]
  current: number | null
  close: Dispatch<SetStateAction<boolean>>
  setHasChanges: Dispatch<SetStateAction<boolean>>
}

export const UpdateStepsAdditionalData = ({
  size,
  open,
  nodes,
  current,
  close,
  setHasChanges,
}: Props) => {
  const [value, setValue] = useState<number>(0)
  const [steps, setSteps] = useState<number>(1)

  const queryClient = useQueryClient()

  useEffect(() => {
    if (open && current && current < nodes.length-1) {
      steps < size && setSteps((prev) => prev+1)

      const percentage = (steps/size)*100
      setValue(percentage)

      const timeout = setTimeout(() => {
        if (steps == size) {
          setSteps(1)
          setValue(0)
          close(false)
          queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.getStrategies] })
          queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.getSteps] })
          successToast({
            title: 'Success!',
            body: 'Registered new positions and additional data!',
          })
          setHasChanges(false)
        }
      }, 250)

      return () => clearInterval(timeout)
    }
  }, [steps, open, current])

  return (
    <Modal
      isOpen={ open }
      onClose={() => {}}
      size='xl'
      scrollBehavior='inside'
      isDismissable={ false }
      hideCloseButton={ true }
      classNames={{
        backdrop: 'z-[9999] bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
        wrapper: 'z-[9999] flex items-center justify-center min-h-screen',
        base: 'z-[9999] max-h-[90vh] w-full sm:w-auto',
      }}
    >
      <ModalContent className='max-h-[90vh] rounded-md'>
        {(onClose) => (
          <>
            <ModalBody className='py-4 my-6'>
              <div className='mx-auto flex justify-center'>
                <div className='rounded-full bg-red-100 p-5'>
                  <CircleAlertIcon className='text-orange-500 h-10 w-10' />
                </div>
              </div>

              <h2 className='text-2xl font-semibold text-gray-900 pt-4'>
                Please wait until the data is fully updated
              </h2>

              <Progress
                aria-label='Downloading...'
                className='w-full'
                color='success'
                showValueLabel={ true }
                size='sm'
                value={ parseFloat(value.toFixed(2)) }
              />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}