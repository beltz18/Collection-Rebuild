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
import { Button } from '@com/index'
import { StepT } from '@typ/strategy'
import { Tabs } from '@com/tabs/tabs'
import { BasicTab } from './element/basic'
import { ConfigTab } from './element/config'
import { useFlowStore } from '@sts/useFlowStore'
import { AnimatedButtonIcon } from '../add/button-animated'
import { useGetMethods } from '@api/routes/additional'
import { useGetProcessors } from '@api/routes/processor'
import { useTokenStore } from '@sts/useTokenStore'

type Props = {
  open: boolean
  close: Dispatch<SetStateAction<boolean>>
  tab: 'basic' | 'config'
  id?: number
}

export const EditStepModal = ({
  id,
  open,
  tab,
  close,
}: Props) => {
  const { steps } = useFlowStore()
  const { token } = useTokenStore()

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

  const handleSubmit = () => {
    setIsSubmitting(true)
    console.log(formData)
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