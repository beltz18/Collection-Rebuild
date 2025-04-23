'use client'

import { TableQueryContainer } from './query-container'
import { Heading } from '@com/heading'
import { Card } from '@heroui/card'
import MenuOptions from '@sec/menufilters'
import {
  useEffect,
  useState,
} from 'react'

export default function App() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <>
      <Card className='flex flex-col gap-4 p-4'>
        <div className='text-default-600 flex justify-between items-center text-lg'>
          <Heading level={1} className='text-theme-text-default/60 text-2xl'>Recent Loans</Heading>
          <MenuOptions />
        </div>
        <TableQueryContainer />
      </Card>
    </>
  )
}