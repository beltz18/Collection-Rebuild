'use client'

import { TableQueryContainer } from './query-container'
import AuthLayout from '../layout'
import { DefaultLayout } from '@lay/default'
import {
  useEffect,
  useState,
} from 'react'

export default function PaymentTable() {
  const [mounted, setMounted] = useState(false)
  const [selected, setSelected] = useState<number>(8)

  useEffect(() => setMounted(true), [])
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