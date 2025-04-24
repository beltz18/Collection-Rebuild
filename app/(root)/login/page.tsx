'use client'

import { useState } from 'react'
import { useTokenStore } from '@sts/useTokenStore'
import { LOGO_ENTITY } from '@uti/var'
import { useRouter } from 'next/navigation'
import { Heading } from '@com/heading'
import { Logo } from '@com/index'
import { Footer } from '@sec/index'
import { useTheme } from '@ctx/themeContext'
import { useAuthenticateUser } from '@api/routes/login'
import {
  Input,
  Button,
} from '@com/index'
import {
  successToast,
  errorToast,
} from '@com/index'

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' })
  const { theme } = useTheme()
  const router = useRouter()
  const setToken = useTokenStore((state) => state.setToken)

  const auth = useAuthenticateUser()

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

  const handleSubmit = async () => {
    try {
      const r = await auth.mutateAsync(formData)
      if (r && r.message) {
        console.log(r)
        successToast({
          title: 'Success!',
          body: 'You are authenticated now!'
        })
        setTimeout(() => createToken(r.data.token), 800)
      } else {
        errorToast({
          title: 'Unexpected Error',
          body: 'We could not validate you',
        })
      }
    } catch (err: unknown) {
      if (err instanceof Error && (err as any)?.response?.data) {
        console.log((err as any).response.data.message)
        errorToast({
          title: 'An error ocurred',
          body: (err as any).response.data.message,
        })
      } else {
        console.log(err)
      }
    }
  }

  return(
    <>
      <div className='bg-[#f7f7efd9] bg-theme-background w-full h-[100vh] flex justify-center items-center flex-col px-4'>
        <Logo
          src={ LOGO_ENTITY }
          width={ 450 }
          height={ 500 }
          alt='logo'
        />

        <div className='max-w-[450px] w-full h-[365px] bg-[#FFFFF] p-4 m-5 rounded-lg flex flex-col justify-around items-center shadow-[0_35px_60px_-15px_rgba(0,0,0,0.234)] px-5 border-t-[1px] border-t-[#1212120a]'>
          <Heading level={1} className={`text-default-600 font-bold text-[25px]`}>
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
              isRequired
              color='default'
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
            >
              Sign In
            </Button>
          </div>
        </div>

        <div className='fixed bottom-0 w-full'>
          <Footer />
        </div>
      </div>
    </>
  )
}