import {
  Dispatch,
  useState,
  useEffect,
  SetStateAction,
} from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@sec/modal'
import { Node } from '@xyflow/react'
import { NodeData } from '@sec/flow/elements/node'
import { Button, errorToast } from '@com/index'
import { StepT } from '@typ/strategy'
import { Tabs } from '@com/tabs/tabs'
import { BasicTab } from './element/basic'
import { ConfigTab } from './element/config'
import { useFlowStore } from '@sts/useFlowStore'
import { AnimatedButtonIcon } from '../add/button-animated'
import { useGetMethods } from '@api/routes/additional'
import { useGetProcessors } from '@api/routes/processor'
import { useTokenStore } from '@sts/useTokenStore'
import { isEqual } from 'radash'
import { useUpdateStep } from '@api/routes/step'
import { generateNewNode } from '@sec/flow/util/util'
import { StepExtended } from '@typ/step'

type Props = {
  open: boolean
  close: Dispatch<SetStateAction<boolean>>
  tab: 'basic' | 'config'
  id?: number
  nodes: Node<NodeData>[]
  setNodes: Dispatch<SetStateAction<Node<NodeData>[]>>
}

export const EditStepModal = ({
  id,
  open,
  tab,
  nodes,
  close,
  setNodes,
}: Props) => {
  const { steps, setSteps } = useFlowStore()
  const { token } = useTokenStore()

  const updateStep = useUpdateStep(token, id)

  const { data: method } = useGetMethods(token)
  const { data: processor } = useGetProcessors(token)

  const [activeTab, setActiveTab] = useState<'basic' | 'config'>(tab)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [formData, setFormData] = useState<StepT | undefined>(undefined)
  const [selectedMethod, setSelectedMethod] = useState<{ id: string, name: string } | null>(null)
  const [selectedProcessor, setSelectedProcessor] = useState<{ id: string, name: string } | null>(null)

  useEffect(() => {
    const step = steps?.find((e) => e.id === id)

    setFormData(() => {
      return step && step.id !== undefined ? { ...step } : undefined
    })

    const m = method?.find((e) => e.id == step?.method)
    const p = processor?.find((e) => e.id == step?.processor)
    
    if (m) setSelectedMethod({ id: String(m.id), name: m.name })
    if (p) setSelectedProcessor({ id: String(p.id), name: p.name })
  }, [id])

  const onClose = () => {
    setActiveTab('basic')
    close(false)
  }

  const handleSelectChange = (name: string, value: any) => {
    if (name === 'method') setSelectedMethod(value)
    else if (name === 'processor') setSelectedProcessor(value)
  
    setFormData((prev) => prev ? { ...prev, [name]: value } : prev)
  }

  const handleSwitchChange = (name: string, checked: boolean) =>
    setFormData((prev) => prev ? { ...prev, [name]: checked } : prev)

  const handleNumberChange = (name: string, value: string) =>
    setFormData((prev) => prev ? { ...prev, [name]: Number.parseInt(value) || 0 } : prev)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    if (formData) {
      const idx = steps?.findIndex((e) => e.id == formData?.id)
      const egp = Array.isArray(steps) ? [...steps] : []
      const tre : StepT = {
        ...formData,
        id: formData?.id,
        method: Number(selectedMethod?.id),
        processor: Number(selectedProcessor?.id),
      }

      if (idx && !isEqual(tre, (steps ?? [])[idx])) {
        try {
          const r = await updateStep.mutateAsync(tre as StepExtended)
          if (r.data) {
            if (egp && idx && egp?.length >= idx) egp.splice(idx, 1, tre)
            setSteps(egp)
    
            const gp1 = nodes.findIndex((e) => e.data.Data?.id == id)
            const nd1 = generateNewNode(
              nodes[gp1].id, nodes[gp1].position.x, nodes[gp1].position.y,
              formData, '', 'step'
            )
    
            const ndD = [ ...nodes ]
            const ndA = ndD.toSpliced(gp1, 1, nd1)
            setNodes(ndA)
            setIsSubmitting(false)
            onClose()
          } else {
            console.log('Error here')
          }
        } catch (err) {
          console.log(err)
          errorToast({
            title: 'Error',
            body: 'Step could not be updated',
          })
        }
      } else onClose()
    }
  }

  return (
    <Modal
      isOpen={ open }
      onClose={ onClose }
      size='xl'
      scrollBehavior='inside'
      classNames={{
        backdrop: 'z-[9999]',
        wrapper: 'z-[9999] flex items-center justify-center min-h-screen',
        base: 'z-[9999] max-h-[90vh] w-full sm:w-auto',
      }}
    >
      <ModalContent className='max-h-[90vh] rounded-md'>
        {(onClose) => (
          <>
            <ModalHeader className='border-b border-default-500/10 pb-3 p-6'>
              Edit step data
            </ModalHeader>

            <ModalBody className='py-4'>
              <Tabs
                selectedKey={ activeTab }
                onSelectionChange={(key) => setActiveTab(key as 'basic' | 'config')}
                aria-label='Step configuration tabs'
                variant='solid'
                classNames={{
                  tabList: 'w-full',
                  tab: 'flex-1 text-center w-full',
                  tabContent: 'w-full',
                }}
              >
                <Tabs.Tab
                  key='basic'
                  title='Basic Information'
                >
                  <BasicTab
                    formData={ formData }
                    handleSwitchChange={ handleSwitchChange }
                  />
                </Tabs.Tab>

                <Tabs.Tab
                  key='config'
                  title='Payment configuration'
                >
                  <ConfigTab
                    formData={ formData }
                    handleNumberChange={ handleNumberChange }
                    handleSelectChange={ handleSelectChange }
                    handleSwitchChange={ handleSwitchChange }
                    methods={ method ?? [] }
                    processors={ processor ?? [] }
                    selectedMethod={ selectedMethod ?? { id: '', name: '' } }
                    selectedProcessor={ selectedProcessor ?? { id: '', name: '' } }
                  />
                </Tabs.Tab>
              </Tabs>
            </ModalBody>

            <ModalFooter>
              {
                activeTab === 'basic'
                  ?
                <Button
                  color='secondary'
                  onPress={() => setActiveTab('config')}
                  placeholder='Next'
                />
                  :
                <>
                  <Button
                    color='primary'
                    onPress={() => setActiveTab('basic')}
                    placeholder='Back'
                  />

                  <Button
                    color='secondary'
                    onPress={ handleSubmit }
                    startContent={ <AnimatedButtonIcon isSubmitting={ isSubmitting } /> }
                    placeholder={ isSubmitting ? 'Updating...' : 'Update step' }
                  />
                </>
              }
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}