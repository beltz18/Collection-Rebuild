'use client'

import { TableQueryContainer } from './query-container'
import AuthLayout from '../layout'
import { DefaultLayout } from '@lay/default'
import { Card } from '@heroui/card'
import MenuOptions from '@sec/menufilters'
import {
  useEffect,
  useState,
} from 'react'

export default function PaymentTable() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <AuthLayout>
      <DefaultLayout>
        <div className='p-4'>
          <Card className='flex flex-col gap-4 p-4'>
            <div className='text-default-600 flex justify-between items-center text-lg'>
              <MenuOptions title='All Payments' />
            </div>
            <TableQueryContainer />
          </Card>
        </div>
      </DefaultLayout>
    </AuthLayout>
  )
}