'use client'

import { useState } from 'react'
import { useTokenStore } from '@sts/useTokenStore'
import { Footer } from '@sec/index'
import { useTheme } from '@ctx/themeContext'
import { usePostStrategies } from '@api/routes/strategy'
import { Palette } from 'lucide-react'
import { ThemeSelector } from '@sec/theme-popover'
import { useQueryClient } from '@tanstack/react-query'
import { CACHE_KEYS } from '@api/cache'
import {
  Input,
  Button,
} from '@com/index'
import {
  successToast,
  errorToast,
} from '@com/index'

type FormProps = {
  active?: boolean
  default?: boolean
  name: string
  day_before_due_to_start?: string
  strict_mode?: boolean
  company?: number
  branch?: number
}

export default function PruebaPostStrategy() {
  const [formData, setFormData] = useState<FormProps>({
    active: true,
    default: true,
    name: '',
    day_before_due_to_start: '',
    strict_mode: true,
    company: 1,
    branch: 1
  })
  
  const queryClient = useQueryClient()
  const { theme } = useTheme()
  const { token } = useTokenStore()

  const auth = usePostStrategies(token)
  const { isPending, isSuccess } = auth

  const handleField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const detectEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter')
      handleSubmit()
  }

  // AÑADIR VALIDACIONES ZOD
  const handleSubmit = async () => {
    if (!formData.name) {
      errorToast({
        title: 'Error',
        body: 'Name can not be empty',
      })
    } else {
      try {
        const r = await auth.mutateAsync(formData)
        console.log(r)
        
        if (r && r.message == 'Payment strategy created successfully') {
          queryClient.refetchQueries({ queryKey: [CACHE_KEYS.getStrategies] })
          successToast({
            title: 'Success!',
            body: 'Payment strategy created successfully!'
          })
        } else {
          errorToast({
            title: 'Error',
            body: 'We could not validate you',
          })
        }
      } catch (err: unknown) {
        if (err instanceof Error && (err as any)?.response?.data) {
          errorToast({
            title: 'Error',
            body: (err as any).response.data.message,
          })
        } else console.log(err)
      }
    }
  }

  return(
    <div className='flex flex-col bg-[#f7f7efd9] bg-theme-background w-full h-[100vh]'>
      <div className="flex justify-end items-end w-full p-4">
        <ThemeSelector placementLogin={true}>
          <div className='w-10 rounded-lg cursor-pointer bg-default-600/10 p-2'>
            <Palette size={24} className="text-theme-text-default/60" />
          </div>
        </ThemeSelector>
      </div>

      <div
        className='w-auto h-full flex justify-center items-center flex-col px-4'
        onKeyDown={ detectEnterKey }
      >
        <div className='max-w-[450px] w-full bg-[#FFFFF] p-4 m-5 rounded-lg flex flex-col justify-around items-center shadow-[0_35px_60px_-15px_rgba(0,0,0,0.234)] px-5 border-t-[1px] border-t-[#1212120a]'>
          <div className='flex flex-col gap-3 w-full '>
            <Input
              type='password'
              label='Active'
              name='active'
              color='default'
              variant='faded'
              radius='sm'
              size='md'
              className='text-default-600'
              onChange={ handleField }
            />
            <Input
              type='password'
              label='Default'
              name='default'
              color='default'
              variant='faded'
              radius='sm'
              size='md'
              className='text-default-600'
              onChange={ handleField }
            />
            <Input
              type='text'
              label='Name'
              name='name'
              color='default'
              isRequired
              variant='faded'
              radius='sm'
              size='md'
              className='text-default-600'
              onChange={ handleField }
            />

            <Input
              type='text'
              label='Days Before Due'
              name='day_before_due_to_start'
              color='default'
              variant='faded'
              radius='sm'
              size='md'
              className='text-default-600'
              onChange={ handleField }
            />
            <Input
              type='password'
              label='Sctrict mode'
              name='strict_mode'
              color='default'
              variant='faded'
              radius='sm'
              size='md'
              className='text-default-600'
              onChange={ handleField }
            />
            <Input
              type='number'
              label='company'
              name='company'
              color='default'
              variant='faded'
              radius='sm'
              size='md'
              className='text-default-600'
              onChange={ handleField }
            />
            <Input
              type='number'
              label='Store'
              name='branch'
              color='default'
              variant='faded'
              radius='sm'
              size='md'
              className='text-default-600'
              onChange={ handleField }
            />

            <Button
              placeholder='Registrar'
              className={`mt-3 text-white
                ${
                  theme === 'light'
                    ? 'bg-[#313030e4] text-[#ededed]'
                    : 'bg-theme-primary'
                }
              `}
              size='lg'
              radius='sm'
              onPress={ handleSubmit }
              disabled={ isPending }
              isLoading={ isPending && !isSuccess }
            />
          </div>
        </div>

        <div className='fixed bottom-0 w-full'>
          <Footer />
        </div>
      </div>
    </div>
  )
}