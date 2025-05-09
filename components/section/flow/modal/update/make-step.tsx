import MakeRevokeConfirmationModal from './update'
import { useState } from 'react'
import { ModalProps } from '@sec/flow/elements/types'
import { useFlowStore } from '@sts/useFlowStore'
import { useUpdateStep } from '@api/routes/step'
import { Node } from '@xyflow/react'
import { NodeData } from '@sec/flow/elements/node'
import { StepT } from '@typ/strategy'
import { useTokenStore } from '@sts/useTokenStore'
import { errorToast, successToast } from '@com/index'
import { StepExtended } from '@typ/step'

export const MakeBasicStepModal = ({
  id,
  open,
  setOpen,
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

        const nodeIdx = nodes.findIndex((e) => e.data.Data?.id == id)
        const stepIdx = steps.findIndex((e) => e.id == id)

        selStep['is_basic_step'] = true
        if (selNode['data'] && selNode['data'].Data)
          selNode['data'].Data.is_basic_step = true

        if (selNode.id && selStep.id) {
          copyNodes.toSpliced(nodeIdx, 1, selNode as Node<NodeData>)
          copySteps.splice(stepIdx, 1, selStep as StepT)
        }

        const r = await updateStep.mutateAsync({
          strategy: selStep.strategy,
          method: selStep.method,
          processor: selStep.processor,
          is_basic_step: selStep.is_basic_step,
        } as StepExtended)

        if (r.data) {
          setSteps(copySteps)
          setNodes(copyNodes)
          handleClose()
          setIsSubmit(false)
          successToast({
            title: 'Done!',
            body: 'Updated step as basic',
          })
        }
      } catch (err) {
        console.log(err)
        errorToast({
          title: 'Error',
          body: 'Step data could not be updated',
        })
      }
    } else {
      errorToast({
        title: 'Error',
        body: 'Something wrong happened',
      })
    }
  }

  return (
    <MakeRevokeConfirmationModal
      isOpen={ open }
      onClose={ handleClose }
      selectedCount={ 1 }
      onConfirm={ handleSubmit }
      isSubmit={ isSubmit }
      title='Make'
      actionText='make'
      entityName='step'
    />
  )
}