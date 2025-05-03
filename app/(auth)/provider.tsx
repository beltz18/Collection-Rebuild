'use client'

import {
  useEffect,
  useState,
} from 'react'
import { useRouter } from 'next/navigation'
import { getSession } from '@uti/getSession'
import { useTokenStore } from '@sts/useTokenStore'
import { Loading } from '@com/index'
import { SYSTEM_ROUTES } from '@api/cache'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers ({ children }: ProvidersProps) {
  const { push } = useRouter()
  const { token } = useTokenStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const session = getSession()
      if (!session)
        push(SYSTEM_ROUTES.login)
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