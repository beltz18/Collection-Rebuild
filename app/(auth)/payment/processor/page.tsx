'use client'

import { TableQueryContainer } from './query-container'
import AuthLayout from '../../layout'
import { DefaultLayout } from '@lay/default'
import { Card } from '@heroui/card'
import { useEffect, useState } from 'react'
import MenuPayment from '@sec/menufilters/menuPayment'

export default function PaymentTable() {
  const [mounted, setMounted] = useState(false)
  const [selectedCount, setSelectedCount] = useState(0)

  useEffect(() => setMounted(true), [])

  const handleSelectionChange = (keys: Set<number>) => {
    setSelectedCount(keys.size)
  }

  if (!mounted) return null

  return (
    <AuthLayout>
      <DefaultLayout>
        <Card className='flex flex-col gap-4 p-4'>
          <div className='text-default-600 flex justify-between items-center text-lg'>
            <MenuPayment title='Payment Processors' selectedCount={selectedCount} />
          </div>
          <TableQueryContainer onSelectionChange={handleSelectionChange} />
        </Card>
      </DefaultLayout>
    </AuthLayout>
  )
}
