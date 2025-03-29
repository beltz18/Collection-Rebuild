'use client'

import { Input as Inp } from '@heroui/react'
import { CustomInputProps } from './input.types'
import { cn } from '@uti/cn'

export const Input: React.FC<CustomInputProps> = ({
  label,
  type = 'text',
  isRequired,
  className,
  onChange,
  radius='md',
  size='md',
  ...props
}) => {
  return (
    <Inp
      type={ type }
      label={ label }
      isRequired={ isRequired }
      radius='sm'
      size='md'
      className={ cn('', className) }
      onChange={onChange}
      { ...props }
    />
  )
}