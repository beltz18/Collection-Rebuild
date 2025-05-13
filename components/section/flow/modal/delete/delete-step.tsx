'use client'

import DeleteConfirmationModal from './delete'
import { useState } from 'react'
import type { ModalProps } from '@sec/flow/elements/types'
import { useFlowStore } from '@sts/useFlowStore'
import { useUpdateStep } from '@api/routes/step'
import type { Node } from '@xyflow/react'
import type { NodeData } from '@sec/flow/elements/node'
import type { StepT } from '@typ/strategy'
import { useTokenStore } from '@sts/useTokenStore'
import type { StepExtended } from '@typ/step'
import { errorToast, successToast } from '@com/index'

export const DeleteStepModal = ({ open, setOpen, id, nodes, setNodes }: ModalProps) => {
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

        const nodeIdx = nodes.findIndex((e) => e.data.Data?.id == id)
        const stepIdx = steps.findIndex((e) => e.id == id)

        selStep['active'] = false
        if (selNode['data'] && selNode['data'].Data) selNode['data'].Data.active = false

        if (selNode.id && selStep.id) {
          copyNodes.toSpliced(nodeIdx, 1, selNode as Node<NodeData>)
          copySteps.splice(stepIdx, 1, selStep as StepT)
        }

        const r = await updateStep.mutateAsync({
          strategy: selStep.strategy,
          method: selStep.method,
          processor: selStep.processor,
          active: false,
        } as StepExtended)

        console.log(id);
        
        console.log(r);
        
        if (r.data) {
          console.log(r.data);
          
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
      isOpen={open}
      onClose={handleClose}
      selectedCount={1}
      onConfirm={handleSubmit}
      isSubmit={isSubmit}
      title='Delete'
      actionText='delete'
      entityName='step'
    />
  )
}