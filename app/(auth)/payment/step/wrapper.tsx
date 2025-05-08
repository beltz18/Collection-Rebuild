'use client'

import {
  useEffect,
  useState,
} from 'react'
import { useSearchParams } from 'next/navigation'
import { StepsQueryContainer } from './query-container'
import { useSidebarStore } from '@sts/useSidebarStore'

export const Wrapper = () => {
  const searchParams = useSearchParams()
  const [strategy, setStrategy] = useState<string | null>('')

  const {
    setActiveTab,
    setActiveChildrenTab,
    setActiveChildrenIndex,
  } = useSidebarStore()

  useEffect(() => {
    setActiveTab('Payments')
    setActiveChildrenTab('Payment Steps')
    setActiveChildrenIndex(3)

    const strategy = searchParams.get('strategyId')
    if (strategy) setStrategy(strategy)
  }, [searchParams])

  return <StepsQueryContainer strategyId={ strategy } />
}