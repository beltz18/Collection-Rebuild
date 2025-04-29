'use client'

import { useEffect } from 'react'
import { DefaultLayout } from '@lay/default'
import { CardQueryContainer } from './query-container'
import { useSidebarStore } from '@sts/useSidebarStore'

export default function App() {
  const {
    setActiveTab,
    setActiveChildrenTab,
    setActiveChildrenIndex,
  } = useSidebarStore()

  useEffect(() => {
    setActiveTab('Payments')
    setActiveChildrenTab('Payment Steps')
    setActiveChildrenIndex(3)
  }, [])

  return (
    <DefaultLayout>
      <CardQueryContainer />
    </DefaultLayout>
  )
}