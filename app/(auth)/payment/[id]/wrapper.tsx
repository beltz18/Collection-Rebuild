'use client'

import { 
  useState, 
  useEffect 
} from 'react'
import { useSidebarStore } from '@sts/useSidebarStore'
import { useParams }       from 'next/navigation'
import { QueryContainer }  from './query-container'

export const Wrapper = () => {
  const { id } = useParams<{ id: string }>()
  const { setActiveTab, clear } = useSidebarStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    clear()
    setActiveTab('Payments')
    setMounted(true)
  }, [])
  
  if (!mounted) return null
  
  return <QueryContainer paymentId={ id } />
}