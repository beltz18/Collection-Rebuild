'use client'

import { TableQueryContainer } from './query-container'
import { Heading } from '@com/heading'
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
    <>
      <Card className='flex flex-col gap-4 p-4'>
        <div className='text-default-600 flex justify-between items-center text-lg'>
          <Heading level={1} className='text-theme-text-title/60 text-2xl'>Recent Payments</Heading>
          <MenuOptions />
        </div>
        <TableQueryContainer />
      </Card>
    </>
  )
}