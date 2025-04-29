'use client'

import { useEffect } from 'react'
import { DefaultLayout } from '@lay/default'
import AuthLayout from './layout'
import LoansTable from './query-loan-container'
import PaymentsTable from './query-payment-container'
import { useSidebarStore } from '@sts/useSidebarStore'

export default function App() {
  const { setActiveTab, clear } = useSidebarStore()
  
  useEffect(() => {
    clear()
    setActiveTab('Home')
  }, [])

  return (
    <AuthLayout>
      <DefaultLayout>
        <div className='flex flex-col gap-5 w-full p-4'>
          <LoansTable />
          <PaymentsTable />
        </div>
      </DefaultLayout>
    </AuthLayout>
  )
}