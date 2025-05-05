'use client'

import { useState, useEffect } from 'react'
import { Tabs } from '@com/tabs/tabs'
import { Button } from '@com/index'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@sec/modal'
import type { AddNodeModalProps, FormData } from './add.types'
import { BasicInfoTab } from './basic-info-tab'
import { PaymentConfigTab } from './config-tab'
import { createNodeData, getInitialFormData } from './utils'
import { AnimatedButtonIcon } from './button-animated'

export default function AddNodeModal({
  isOpen,
  onClose,
  onAdd,
  currentStrategyId,
  nextStepOrder,
  strategyName = 'Default Strategy',
}: AddNodeModalProps) {
  const [activeTab, setActiveTab] = useState('basic')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [selectedProcessor, setSelectedProcessor] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>(getInitialFormData(currentStrategyId, nextStepOrder))

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      strategy: currentStrategyId,
      order: nextStepOrder,
    }))
  }, [currentStrategyId, nextStepOrder])

  const handleSelectChange = (name: string, value: string) => {
    if (name === 'method') {
      setSelectedMethod(value)
    } else if (name === 'processor') {
      setSelectedProcessor(value)
    }
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleNumberChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: Number.parseInt(value) || 0 }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    const nodeData = createNodeData(activeTab, formData, strategyName)
    await new Promise((resolve) => setTimeout(resolve, 600))

    onAdd?.(nodeData)

    setFormData(getInitialFormData(currentStrategyId, nextStepOrder))
    setActiveTab('basic')
    setIsSubmitting(false)
    onClose()
  }

  return (
    <Modal 
      isOpen={isOpen}
      onClose={onClose}
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
              <h2 className='text-xl font-semibold'>Add New Step</h2>
            </ModalHeader>

            <ModalBody className='py-4'>
              <Tabs
                selectedKey={activeTab}
                onSelectionChange={(key) => setActiveTab(key as string)}
                aria-label='Step configuration tabs'
                variant='solid'
                classNames={{
                  tabList: 'w-full',
                  tab: 'flex-1 text-center w-full',
                  tabContent: 'w-full',
                }}
              >
                <Tabs.Tab key='basic' title='Basic Information' className='w-full'>
                  <BasicInfoTab
                    formData={formData}
                    strategyName={strategyName}
                    handleNumberChange={handleNumberChange}
                    handleSwitchChange={handleSwitchChange}
                  />
                </Tabs.Tab>
                <Tabs.Tab key='strategy' title='Payment Configuration'>
                  <PaymentConfigTab
                    formData={formData}
                    selectedMethod={selectedMethod}
                    selectedProcessor={selectedProcessor}
                    handleSelectChange={handleSelectChange}
                    handleNumberChange={handleNumberChange}
                  />
                </Tabs.Tab>
              </Tabs>
            </ModalBody>

            <ModalFooter className='border-t border-default-500/10 pt-3'>
              <Button
                color='primary'
                onPress={handleSubmit}
                disabled={isSubmitting}
                startContent={<AnimatedButtonIcon isSubmitting={isSubmitting} />}
                placeholder={isSubmitting ? 'Creating...' : 'Create Step'}
              />
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}