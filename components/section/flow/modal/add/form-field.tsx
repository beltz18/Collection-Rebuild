'use client'

import type React from 'react'
import { Input } from '@com/index'
import { Switch } from '@heroui/react'
import { cn } from '@uti/cn'

interface FormFieldProps {
  label: string
  children: React.ReactNode
  helpText?: string
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  children,
  helpText,
}) => {
  return (
    <div className='grid grid-cols-4 items-start gap-4'>
      <label className='text-right text-sm font-medium'>
        { label }
      </label>

      <div className='col-span-3'>
        { children }
        { helpText &&
          <p className='text-xs text-gray-500 mt-1'>
            { helpText }
          </p>
        }
      </div>
    </div>
  )
}

interface InputFieldProps {
  label: string
  id: string
  name: string
  type?: string
  value: string
  onChange: (name: string, value: string) => void
  className?: string
  helpText?: string
  disabled?: boolean
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  className,
  helpText,
  disabled=false,
}) => {
  return (
    <FormField
      label={ label }
      helpText={ helpText }
    >
      <Input
        id={ id }
        name={ name }
        type={ type }
        value={ value }
        onChange={(e) => onChange(name, e.target.value)}
        className={ cn('w-full', className) }
        disabled={ disabled }
        size='sm'
      />
    </FormField>
  )
}

interface SwitchFieldProps {
  label: string
  id: string
  isSelected: boolean
  onChange: (name: string, checked: boolean) => void
  className?: string
  helpText?: string
}

export const SwitchField: React.FC<SwitchFieldProps> = ({
  label,
  id,
  isSelected,
  onChange,
  helpText,
  className,
}) => {
  return (
    <FormField
      label={ label }
      helpText={ helpText }
    >
      <div className='flex items-center space-x-2'>
        <Switch
          id={ id }
          isSelected={ isSelected }
          className={ className }
          onValueChange={(checked) => onChange(id, checked)}
          size='sm'
        />

        <label
          htmlFor={ id }
          className='text-sm'
        >
          { isSelected ? 'Enabled' : 'Disabled' }
        </label>
      </div>
    </FormField>
  )
}