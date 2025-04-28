'use client'

import {
  useEffect,
  useState,
} from 'react'
import { TableQueryContainer } from './query-container'
import AuthLayout from '../../layout'
import { DefaultLayout } from '@lay/default'
import { Card } from '@heroui/card'
import MenuPayment from '@sec/menufilters/menuPayment'
import { useSidebarStore } from '@sts/useSidebarStore'

export default function PaymentTable() {
  const [mounted, setMounted] = useState(false)
  const [selectedCount, setSelectedCount] = useState(0)
  const {
    setActiveTab,
    setActiveChildrenTab,
    setActiveChildrenIndex,
  } = useSidebarStore()

  useEffect(() => {
    setMounted(true)
    setActiveTab('Payments')
    setActiveChildrenTab('Payment Processors')
    setActiveChildrenIndex(1)
  }, [])

  if (!mounted) return null

  const handleSelectionChange = (keys: Set<number>) =>
    setSelectedCount(keys.size)

  return (
    <AuthLayout>
      <DefaultLayout>
        <div className='p-4'>
          <Card className='flex flex-col gap-4 p-4'>
            <div className='text-default-600 flex justify-between items-center text-lg'>
              <MenuPayment title='Payment Processors' selectedCount={ selectedCount } />
            </div>
            <TableQueryContainer onSelectionChange={ handleSelectionChange } />
          </Card>
        </div>
      </DefaultLayout>
    </AuthLayout>
  )
}
