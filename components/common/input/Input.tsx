'use client'

import { Input } from '@heroui/react'
import { CustomInputProps } from './input.types'

const CustomInput: React.FC<CustomInputProps> = ({ label, type = 'text', name, isRequired, className, onChange }) => {
  return <Input type={type} label={label} name={name} isRequired={isRequired} color='default' variant='faded' radius='sm' size='md' className={`${className}`} onChange={onChange} />
}

export default CustomInput
