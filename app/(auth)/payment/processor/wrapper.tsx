'use client'

import {
  useEffect,
  useState,
} from 'react'
import { Card } from '@heroui/card'
import { TableQueryContainer } from './query-container'
import { useSidebarStore } from '@sts/useSidebarStore'
import MenuPayment from './elements/menu/menuPayment'

export const Wrapper = () => {
  const [mounted, setMounted] = useState(false)
  const [selectedCount, setSelectedCount] = useState(0)
  const { setActiveTab, setActiveChildrenTab, setActiveChildrenIndex } =
    useSidebarStore()

  const [filters, setFilters] = useState({
    status: '',
    processorType: '',
    secCodes: '',
    useSameDayAch: '',
    uniqueNames: '',
  })

  const applyFilters = () => {
      alert('works')
      console.log( filters.status,
        filters.processorType,
        filters.secCodes,
        filters.useSameDayAch,
        filters.uniqueNames,)
  }

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
    <div className='p-4'>
      <Card className='flex flex-col gap-4 p-4'>
        <div className='text-default-600 flex justify-between items-center text-lg'>
          <MenuPayment
            title='Payment Processors'
            selectedCount={ selectedCount }
            filters={ filters }
            setFilters={ setFilters }
            applyFilters={ applyFilters }
          />
        </div>
        <TableQueryContainer onSelectionChange={ handleSelectionChange } />
      </Card>
    </div>
  )
}