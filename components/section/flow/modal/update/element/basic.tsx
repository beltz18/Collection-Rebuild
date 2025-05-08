import {
  InputField,
  SwitchField,
} from '../../add/form-field'
import { StepT } from '@typ/strategy'

interface BasicInfoTabProps {
  formData: StepT | undefined
  handleSwitchChange: (name: string, checked: boolean) => void
}

export const BasicTab: React.FC<BasicInfoTabProps> = ({
  formData,
  handleSwitchChange,
}) => {
  return (
    <form className='space-y-6'>
      <InputField
        label='Step Order'
        id='order'
        name='order'
        type='number'
        value={ String(formData?.order) }
        helpText='The order determines the sequence of execution for this step. Lower numbers execute first.'
        disabled
      />

      <SwitchField
        label='Active'
        id='active'
        isSelected={ formData?.active ?? false }
        onChange={ handleSwitchChange }
      />
    </form>
  )
}