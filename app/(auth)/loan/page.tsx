'use client'

import { TableQueryContainer } from './query-container'
import AuthLayout from '../layout'
import { DefaultLayout } from '@lay/default'
import { useSidebarStore } from '@sts/useSidebarStore'
import {
  useEffect,
  useState,
} from 'react'

export default function PaymentTable() {
  const { setActiveTab, clear } = useSidebarStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    clear()
    setActiveTab('Loans')
    setMounted(true)
  }, [])
  
  if (!mounted) return null

  return (
    <AuthLayout>
      <DefaultLayout>
        <div className='p-4'>
          <TableQueryContainer />
        </div>
      </DefaultLayout>
    </AuthLayout>
  )
}