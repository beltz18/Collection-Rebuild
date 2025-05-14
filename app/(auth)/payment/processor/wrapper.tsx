'use client'

import {
  useEffect,
  useState,
} from 'react'
import { Card } from '@heroui/card'
import { QueryContainer } from './query-container'
import { useSidebarStore } from '@sts/useSidebarStore'
import MenuPayment from './elements/menu/menuPayment'
import { useDebounce } from '@uti/useDebounce'
import { useSelected } from '@sts/useSelectedStore'

export const Wrapper = () => {
  const { selectedCellsP } = useSelected()

  const [search, setSearch] = useState<string>('')
  const [mounted, setMounted] = useState(false)
  const debouncedSearch = useDebounce(search, 500)
  
  const {
    setActiveTab,
    setActiveChildrenTab,
    setActiveChildrenIndex,
  } = useSidebarStore()

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

  return (
    <div className='p-4'>
      <Card className='flex flex-col gap-4 p-4'>
        <div className='text-default-600 flex justify-between items-center text-lg'>
          <MenuPayment
            title='Payment Processors'
            selectedCount={ 0 }
            cells={ selectedCellsP }
            filters={ filters }
            setFilters={ setFilters }
            applyFilters={ applyFilters }
            input={ search }
            setInput={ setSearch }
          />
        </div>

        <QueryContainer
          search={ debouncedSearch }
          setSearch={ setSearch }
        />
      </Card>
    </div>
  )
}