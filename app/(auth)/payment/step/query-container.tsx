'use client'

import { ComponentContainer } from './component-container'
import { useGetStrategies } from '@api/routes/strategy'
import { useTokenStore } from '@sts/useTokenStore'
import { useEffect } from 'react'
import { errorToast } from '@com/index'

const  items = ['pay1', 'pay2','pay3','pay4']

type Props = {
  strategyId: string | null
}

export const StepsQueryContainer = ({ strategyId }: Props) => {
  const { token, logout } = useTokenStore()

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetStrategies(token)

  console.log(data)
  
  useEffect(() => {
    console.log(strategyId)
    if (isError) {
      console.log(error)
      errorToast({
        title: 'Error',
        body: 'Session expired or unexpected error. Please sign in again',
        duration: 5000,
      })
      logout()
    }
  }, [strategyId, isError, error, logout])

  return (
    <div className='w-full min-h-full flex items-center justify-center flex-col gap-4'>
      <ComponentContainer data={ items } />
    </div>
  )
}