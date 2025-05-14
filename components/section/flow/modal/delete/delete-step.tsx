'use client'

import DeleteConfirmationModal from './delete'
import { useState } from 'react'
import { ModalProps } from '@sec/flow/elements/types'
import { useFlowStore } from '@sts/useFlowStore'
import { useUpdateStep } from '@api/routes/step'
import { Node } from '@xyflow/react'
import { NodeData } from '@sec/flow/elements/node'
import { StepT } from '@typ/strategy'
import { useTokenStore } from '@sts/useTokenStore'
import { StepExtended } from '@typ/step'
import {
  errorToast,
  successToast,
} from '@com/index'

export const DeleteStepModal = ({
  open,
  setOpen,
  id,
  nodes,
  setNodes,
}: ModalProps) => {
  const { steps, setSteps } = useFlowStore()
  const { token } = useTokenStore()
  const [isSubmit, setIsSubmit] = useState<boolean>(false)

  const updateStep = useUpdateStep(token, id)

  const handleClose = () => setOpen(false)

  const handleSubmit = async () => {
    if (nodes && steps && setNodes) {
      try {
        setIsSubmit(true)

        const copyNodes = Array.isArray(nodes) ? [...nodes] : []
        const copySteps = Array.isArray(steps) ? [...steps] : []

        const selNode = { ...nodes.find((e) => e.data.Data?.id == id) }
        const selStep = { ...steps?.find((e) => e.id == id) } as StepExtended

        selStep['active'] = false
        if (selNode['data'] && selNode['data'].Data) selNode['data'].Data.active = false

        if (selNode.id && selStep.id) {
          copyNodes.pop()
          copySteps.pop()
        }

        const r = await updateStep.mutateAsync({
          strategy: selStep.strategy,
          method: selStep.method,
          processor: selStep.processor,
          active: false,
        } as StepExtended)
        
        if (r.data) {
          setSteps(copySteps)
          setNodes(copyNodes)
          handleClose()
          setIsSubmit(false)
          successToast({
            title: 'Done!',
            body: 'Step successfully removed',
          })
        }
      } catch (err) {
        console.log(err)
        errorToast({
          title: 'Error',
          body: 'Step data could not be updated',
        })
        setIsSubmit(false)
      }
    } else {
      errorToast({
        title: 'Error',
        body: 'Something wrong happened...',
      })
      setIsSubmit(false)
    }
  }

  return (
    <DeleteConfirmationModal
      isOpen={ open }
      onClose={ handleClose }
      selectedCount={ 1 }
      onConfirm={ handleSubmit }
      isSubmit={ isSubmit }
      title='Delete'
      actionText='delete'
      entityName='step'
    />
  )
}