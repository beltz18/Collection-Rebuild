'use client'

import { ComponentContainer } from './component-container'
import { useTokenStore } from '@sts/useTokenStore'
import { useFlowStore } from '@sts/useFlowStore'
import { StrategySelector } from './util/strategySelector'
import {
  StepT,
  StrategyT,
} from '@typ/strategy'
import {
  useGetStrategies,
  useGetSteps,
} from '@api/routes/strategy'
import {
  errorToast,
  warningToast,
} from '@com/index'
import {
  useEffect,
  useState,
} from 'react'

type Props = {
  strategyId: string | null
}

export const StepsQueryContainer = ({ strategyId }: Props) => {
  const { token, logout } = useTokenStore()
  const { setSteps, setStrategy } = useFlowStore()

  const [selectedStrategy, setSelectedStrategy] = useState<StrategyT | null>(null)
  const [value, setValue] = useState<string | number | null>(null)
  const [dataSteps, setDataSteps] = useState<[StrategyT, ...StepT[]] | null>(null)

  const {
    data,
    isError,
    error,
  } = useGetStrategies(token)

  const {
    data: s,
    refetch,
  } = useGetSteps(
    token,
    { strategy_id: selectedStrategy?.id },
    { enabled: false },
  )
  
  useEffect(() => {
    // console.log(strategyId)
    if (isError) {
      console.log(error)
      errorToast({
        title: 'Error',
        body: 'Session expired or unexpected error. Please sign in again',
        duration: 5000,
      })
      logout()
    }
    if (value && data)
      setSelectedStrategy(data?.find((s) => value == s.id) || null)
  }, [strategyId, isError, error, logout, value])

  const handleGoToSteps = async () => {
    if (!selectedStrategy) {
      warningToast({
        body: 'You must select an strategy first',
        duration: 3000
      })
      return
    }

    try {
      const { data: stepsData } = await refetch()

      if (stepsData && stepsData.length > 0) {
        const sortedSteps = [...stepsData].sort((a, b) => a.order - b.order)
        const strategyFinal = { ...selectedStrategy }
        strategyFinal['id'] = 999999999

        setStrategy(selectedStrategy)
        setSteps(stepsData ?? [])

        setDataSteps([strategyFinal, ...(sortedSteps ?? [])])
      } else {
        setDataSteps([selectedStrategy])
      }
    } catch (err) { console.log(err) }
  }

  return (
    <div className='w-full h-full flex items-center justify-center flex-col gap-4'>
      {
        dataSteps && dataSteps?.length > 0
          ?
        <ComponentContainer
          data={ dataSteps }
        />
          :
        <StrategySelector
          data={
            data?.map((s) => ({
              key: s.id,
              label: s.name,
            }))
              ??
            []
          }
          setValue={ setValue }
          handleClick={ handleGoToSteps }
        />
      }
    </div>
  )
}