'use client'

import {
  InputField,
  SwitchField,
} from './form-field'
import { Chip } from '@com/chip'
import { FormData } from './add.types'

interface BasicInfoTabProps {
  formData: FormData
  strategyName: string
  handleNumberChange: (name: string, value: string) => void
  handleSwitchChange: (name: string, checked: boolean) => void
}

export const BasicInfoTab: React.FC<BasicInfoTabProps> = ({
  formData,
  strategyName,
  handleNumberChange,
  handleSwitchChange,
}) => {
  return (
    <form className='space-y-6'>
      <div className='grid grid-cols-4 items-start gap-4'>
        <label htmlFor='strategy' className='text-right text-sm font-medium'>
          Strategy
        </label>

        <div className='col-span-3'>
          <Chip
            color='primary'
            variant='flat'
            className='text-sm font-medium capitalize'
          >
            { strategyName }
          </Chip>
        </div>
      </div>

      <InputField
        label='Step Order'
        id='order'
        name='order'
        type='number'
        value={ isNaN(Number(formData.order)) ? '1' : formData.order.toString() }
        onChange={ handleNumberChange }
        helpText='The order determines the sequence of execution for this step. Lower numbers execute first.'
        disabled
      />

      <SwitchField
        label='Active'
        id='active'
        isSelected={ formData.active }
        onChange={ handleSwitchChange }
      />
    </form>
  )
}