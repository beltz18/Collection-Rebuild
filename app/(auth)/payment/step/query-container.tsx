'use client'

import { ComponentContainer } from './component-container'
import { useTokenStore } from '@sts/useTokenStore'
import { useFlowStore } from '@sts/useFlowStore'
import { StrategySelector } from './util/strategySelector'
import { useGetProcessors } from '@api/routes/processor'
import {
  useGetCompanies,
  useGetBranches,
  useGetMethods,
} from '@api/routes/additional'
import {
  useGetStrategies,
  useGetSteps,
} from '@api/routes/strategy'
import {
  StepT,
  StrategyT,
} from '@typ/strategy'
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
  const {
    companies,
    setSteps,
    setStrategy,
    setCompanies,
  } = useFlowStore()

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

  const { data: methods } = useGetMethods(token)
  const { data: processors } = useGetProcessors(token)
  const { data: company } = useGetCompanies(token)
  const {
    data: b,
    refetch: refetchBranch,
  } = useGetBranches(
    token,
    { company_id: selectedStrategy?.company },
    { enabled: false },
  )
  
  useEffect(() => {
    // console.log(strategyId)
    if (company && company?.length > 0) setCompanies(company)

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
  }, [strategyId, isError, error, logout, value, companies])

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
      const { data: branches } = await refetchBranch()

      if (stepsData && stepsData.length > 0) {
        let sortedSteps = [...stepsData].sort((a, b) => a.order - b.order)
        const strategyFinal = { ...selectedStrategy }

        strategyFinal['id'] = 999999999
        strategyFinal['company'] = companies?.find((el) => el.company_id == selectedStrategy.company)?.name ?? null
        strategyFinal['branch'] = branches?.find((el) => el.branch_id == selectedStrategy.branch)?.name ?? null
        
        sortedSteps = sortedSteps.map((el) => ({
          ...el,
          method: methods?.find((e) => e.id == el.method)?.name ?? '',
          processor: processors?.find((e) => e.id == el.processor)?.name ?? '',
        }))

        setStrategy(selectedStrategy)
        setSteps(stepsData ?? [])

        setDataSteps([strategyFinal, ...(sortedSteps ?? [])])
      } else
        setDataSteps([selectedStrategy])
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
        <div className='px-4 w-full flex justify-center'>
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
        </div>
      }
    </div>
  )
}