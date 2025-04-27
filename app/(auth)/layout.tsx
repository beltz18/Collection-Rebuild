'use client'

import {
  useEffect,
  useState,
} from 'react'
import { useRouter } from 'next/navigation'
import { getSession } from '@uti/getSession'
import { useTokenStore } from '@sts/useTokenStore'
import { Loader } from '@com/index'

export default function AuthLayout({ children }: { children: React.ReactNode }) {0
  const router = useRouter()
  const { token } = useTokenStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const session = getSession()
      if (!session)
        router.push('/login')
      setIsLoading(false)
    }
    checkAuth()
  }, [token])

  if (isLoading) { return <Loading /> }
  else if (token && !isLoading) {
    return (
      <>
        { children }
      </>
    )
  } else { return <Loading /> }
}

const Loading = () => {
  return (
    <div className='flex items-center justify-center w-full h-screen bg-gray-100'>
      <div className='flex flex-col gap-3 items-center justify-center'>
        <Loader />
        <span className='text-theme-text-default'>Loading...</span>
      </div>
    </div>
  )
}