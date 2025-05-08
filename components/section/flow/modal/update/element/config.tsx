import {
  Select,
  SelectItem,
} from '@heroui/react'
import {
  useEffect,
  useState,
} from 'react'
import { useGetProcessorMethodCrossed } from '@api/routes/additional'
import { Heading } from '@com/heading'
import { StepT } from '@typ/strategy'
import { InputField } from '../../add/form-field'
import { useTokenStore } from '@sts/useTokenStore'
import { ProcessorT } from '@typ/processor'
import { Method } from '@typ/base'

interface PaymentConfigTabProps {
  formData: StepT | undefined
  selectedMethod: { id: string, name: string }
  selectedProcessor: { id: string, name: string }
  methods: Method[]
  processors: ProcessorT[]
  handleSelectChange: (name: string, value: any) => void
  handleNumberChange: (name: string, value: string) => void
  handleSwitchChange: (name: string, checked: boolean) => void
}

export const ConfigTab: React.FC<PaymentConfigTabProps> = ({
  formData,
  selectedMethod,
  selectedProcessor,
  methods,
  processors,
  handleSelectChange,
  handleNumberChange,
  handleSwitchChange,
}) => {
  const [available, setAvailable] = useState<ProcessorT[] | null>([])
  const { token } = useTokenStore()

  const { refetch } = useGetProcessorMethodCrossed(
    token,
    { payment_method: Number(selectedMethod.id), },
    { enabled: false },
  )

  useEffect(() => {
    const fetchData = async () => {
      const { data: crossedProcessors } = await refetch()

      if (!crossedProcessors || !processors) return

      const validProcessorIds = crossedProcessors.map(p => p.payment_processor)
      const filteredProcessors = processors.filter(p => validProcessorIds.includes(p.id))

      setAvailable(filteredProcessors)
    }
    
    if (selectedMethod) fetchData()
    if (formData && !formData.order) {
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
            selectedKeys={ selectedMethod ? [selectedMethod.id.toString()] : [] }
            onChange={(e) => {
              const value = methods?.find((el) => el.id == Number(e.target.value))
              handleSelectChange('method', { id: value?.id, name: value?.name })
            }}
            placeholder='Select payment method'
            className='w-full'
            size='sm'
          >
            {
              methods?.map((method) => (
                <SelectItem
                  key={ method.id }
                  data-value={ method.id.toString() }
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
            selectedKeys={ selectedProcessor ? [selectedProcessor.id.toString()] : [] }
            onChange={(e) => {
              const value = available?.find((el) => el.id == Number(e.target.value))
              handleSelectChange('processor', { id: value?.id, name: value?.name })
            }}
            placeholder='Select payment processor'
            className='w-full'
            size='sm'
          >
            <>
              {
                available?.map((processor) => (
                  <SelectItem
                    key={ processor.id }
                    data-value={ processor.id.toString() }
                    className='hover:outline-none'
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
        value={ formData?.attempts.toString() ?? '3' }
        onChange={ handleNumberChange }
        helpText='Maximum number of retry attempts for this step.'
      />

      <InputField
        label='Min Hours Between Attempts'
        id='minHoursBetweenAttempts'
        name='minHoursBetweenAttempts'
        type='number'
        value={ formData?.min_hours_between_attempts.toString() ?? '24' }
        onChange={ handleNumberChange }
        helpText='Required waiting period (in hours) between retry attempts.'
      />

      <InputField
        label='Min Hours Before Next Step'
        id='minHoursBeforeNextStep'
        name='minHoursBeforeNextStep'
        type='number'
        value={ formData?.min_hours_before_next_step.toString() ?? '0' }
        onChange={ handleNumberChange }
      />
    </form>
  )
}