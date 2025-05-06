'use client'

import {
  Select,
  SelectItem,
} from '@heroui/react'
import {
  useGetMethods,
  useGetProcessorMethodCrossed,
} from '@api/routes/additional'
import { useEffect, useState } from 'react'
import { Heading } from '@com/heading'
import { FormData } from './add.types'
import { InputField } from './form-field'
import { useGetProcessors } from '@api/routes/processor'
import { useTokenStore } from '@sts/useTokenStore'
import { ProcessorT } from '@typ/processor'

interface PaymentConfigTabProps {
  formData: FormData
  selectedMethod: string | null
  selectedProcessor: string | null
  handleSelectChange: (name: string, value: string) => void
  handleNumberChange: (name: string, value: string) => void
  handleSwitchChange: (name: string, checked: boolean) => void
}

export const PaymentConfigTab: React.FC<PaymentConfigTabProps> = ({
  formData,
  selectedMethod,
  selectedProcessor,
  handleSelectChange,
  handleNumberChange,
  handleSwitchChange,
}) => {
  const [available, setAvailable] = useState<ProcessorT[] | null>([])
  const { token } = useTokenStore()

  const { data: method } = useGetMethods(token)
  const { data: processor } = useGetProcessors(token)

  const { refetch } = useGetProcessorMethodCrossed(
    token,
    { payment_method: Number(selectedMethod), },
    { enabled: false },
  )

  useEffect(() => {
    const fetchData = async () => {
      const { data: crossedProcessors } = await refetch()

      if (!crossedProcessors || !processor) return

      const validProcessorIds = crossedProcessors.map(p => p.payment_processor)
      const filteredProcessors = processor.filter(p => validProcessorIds.includes(p.id))

      setAvailable(filteredProcessors)
    }
    
    if (selectedMethod) fetchData()
    if (!formData.order) {
      console.log('order setted')
      handleNumberChange('order', '1')
      handleSwitchChange('is_basic_step', true)
    }
  }, [selectedMethod])

  return (
    <form className='space-y-6'>
      <Heading
        level={ 3 }
        className='text-lg font-semibold mb-4'
      >
        Payment Configuration
      </Heading>

      <div className='grid grid-cols-4 items-center gap-4'>
        <label
          htmlFor='method'
          className='text-right text-sm font-medium'
        >
          Method
        </label>

        <div className='col-span-3'>
          <Select
            id='method'
            selectedKeys={ selectedMethod ? [selectedMethod] : [] }
            onChange={(e) => handleSelectChange('method', e.target.value)}
            placeholder='Select payment method'
            className='w-full'
            size='sm'
          >
            {
              method?.map((method) => (
                <SelectItem
                  key={ method.id }
                  data-value={ method.id }
                  className='hover:outline-none'
                >
                  { method.name }
                </SelectItem>
              ))
                ||
              <SelectItem
                key={ 0 }
                data-value={ null }
                className='hover:outline-none'
                isDisabled
              >
                No methods found
              </SelectItem>
            }
          </Select>
        </div>
      </div>

      <div className='grid grid-cols-4 items-center gap-4'>
        <label htmlFor='processor' className='text-right text-sm font-medium'>
          Processor
        </label>

        <div className='col-span-3'>
          <Select
            id='processor'
            selectedKeys={ selectedProcessor ? [selectedProcessor] : [] }
            onChange={(e) => handleSelectChange('processor', e.target.value)}
            placeholder='Select payment processor'
            className='w-full'
            size='sm'
          >
            <>
              {
                available?.map((processor) => (
                  <SelectItem
                    key={ processor.id }
                    data-value={ processor.id }
                  >
                    { processor.name }
                  </SelectItem>
                ))
              }

              {
                !available?.length && (
                  <SelectItem
                    key={ 0 }
                    data-value={ null }
                    className='hover:outline-none'
                    isDisabled
                  >
                    No processors found
                  </SelectItem>
                )
              }
            </>
          </Select>
        </div>
      </div>

      <InputField
        label='Attempts'
        id='attempts'
        name='attempts'
        type='number'
        value={ formData.attempts.toString() }
        onChange={ handleNumberChange }
        helpText='Maximum number of retry attempts for this step.'
      />

      <InputField
        label='Min Hours Between Attempts'
        id='minHoursBetweenAttempts'
        name='minHoursBetweenAttempts'
        type='number'
        value={ formData.minHoursBetweenAttempts.toString() }
        onChange={ handleNumberChange }
        helpText='Required waiting period (in hours) between retry attempts.'
      />

      <InputField
        label='Min Hours Before Next Step'
        id='minHoursBeforeNextStep'
        name='minHoursBeforeNextStep'
        type='number'
        value={ formData.minHoursBeforeNextStep.toString() }
        onChange={ handleNumberChange }
      />
    </form>
  )
}