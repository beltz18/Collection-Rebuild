'use client'

import { useEffect } from 'react'
import { useSidebarStore } from '@sts/useSidebarStore'

type Props = {
  children: React.ReactNode
}

export const Wrapper = ({ children }: Props) => {
  const { setActiveTab, clear } = useSidebarStore()
    
  useEffect(() => {
    clear()
    setActiveTab('Home')
  }, [])

  return <>
    { children }
  </>
}