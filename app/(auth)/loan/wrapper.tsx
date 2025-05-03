'use client'

import { useSidebarStore } from '@sts/useSidebarStore'
import {
  useEffect,
  useState,
} from 'react'

type Props = {
  children: React.ReactNode
}

export const Wrapper = ({ children }: Props) => {
  const { setActiveTab, clear } = useSidebarStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    clear()
    setActiveTab('Loans')
    setMounted(true)
  }, [])
  
  if (!mounted) return null

  return <>
    { children }
  </>
}