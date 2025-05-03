'use client'

import { useState } from 'react'
import { useTokenStore } from '@sts/useTokenStore'
import { useRouter } from 'next/navigation'
import { Heading } from '@com/heading'
import { Logo } from '@com/index'
import { Footer } from '@sec/index'
import { useTheme } from '@ctx/themeContext'
import { useAuthenticateUser } from '@api/routes/login'
import { Palette } from 'lucide-react'
import { ThemeSelector } from '@sec/theme-popover'
import {
  CONTRAST,
  LOGO_ENTITY,
} from '@uti/var'
import {
  Input,
  Button,
} from '@com/index'
import {
  successToast,
  errorToast,
} from '@com/index'

type FormProps = {
  username: string
  password: string
}

export const LoginForm = () => {
  const [formData, setFormData] = useState<FormProps>({ username: '', password: '' })
  
  const { theme } = useTheme()

  const router = useRouter()
  const setToken = useTokenStore((state) => state.setToken)
  const auth = useAuthenticateUser()
  const { isPending, isSuccess } = auth

  const createToken = (token: string) => {
    setToken(token)
    router.push('/')
  }

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

  const handleSubmit = async () => {
    if (!formData.username || !formData.password) {
      errorToast({
        title: 'Error',
        body: 'Username or password can not be empty',
      })
    } else {
      try {
        const r = await auth.mutateAsync(formData)
        if (r && r.message == 'Success') {
          successToast({
            title: 'Success!',
            body: 'You are authenticated now!'
          })
          createToken(r.data.token)
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
        <ThemeSelector placementLogin={ true }>
          <div className='w-auto rounded-lg cursor-pointer bg-default-600/10 p-2'>
            <Palette
              size={ 24 }
              className="text-theme-text-default/60"
            />
          </div>
        </ThemeSelector>
      </div>

      <div
        className='w-auto h-full flex justify-center items-center flex-col px-4'
        onKeyDown={ detectEnterKey }
      >
        <Logo
          src={ Boolean(['dark'].find((e) => e == theme)) ? CONTRAST : LOGO_ENTITY }
          width={ 450 }
          height={ 500 }
          alt='Logo'
        />

        <div className='max-w-[450px] w-full h-[365px] bg-[#FFFFF] p-4 m-5 rounded-lg flex flex-col justify-around items-center shadow-[0_35px_60px_-15px_rgba(0,0,0,0.234)] px-5 border-t-[1px] border-t-[#1212120a]'>
          <Heading
            level={ 1 }
            className={`text-default-600 font-bold text-[25px]`}
          >
            Login to Collection
          </Heading>

          <div className='flex flex-col gap-3 w-full '>
            <Input
              type='text'
              label='Username'
              name='username'
              color='default'
              isRequired
              variant='faded'
              radius='sm'
              size='md'
              className='text-default-600'
              onChange={ handleField }
            />

            <Input
              type='password'
              label='Password'
              name='password'
              color='default'
              isRequired
              variant='faded'
              radius='sm'
              size='md'
              className='text-default-600'
              onChange={ handleField }
            />

            <Button
              placeholder='Sign In'
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
            >
              Sign In
            </Button>
          </div>
        </div>

        <div className='fixed bottom-0 w-full'>
          <Footer />
        </div>
      </div>
    </div>
  )
}