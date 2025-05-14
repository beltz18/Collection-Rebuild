'use client'

import {
  useEffect,
  useState,
} from 'react'
import { Card } from '@heroui/card'
import { TableQueryContainer } from './query-container'
import { useSidebarStore } from '@sts/useSidebarStore'
import MenuPayment from './elements/menu/menuPayment'
import { useDebounce } from '@uti/useDebounce'
import { useSelected } from '@sts/useSelectedStore'

export const Wrapper = () => {
  const { selectedCells } = useSelected()

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
    default: '',
    company_id: '',
    branch_id: '',
    days_before_due_to_start: '',
    strict_mode: '',
  })

  const applyFilters = () => {
    alert('works')
    console.log(
      filters.status,
      filters.default,
      filters.company_id,
      filters.branch_id,
      filters.days_before_due_to_start,
      filters.strict_mode
    )
  }

  useEffect(() => {
    setMounted(true)
    setActiveTab('Payments')
    setActiveChildrenTab('Payment Strategies')
    setActiveChildrenIndex(2)
  }, [])

  if (!mounted) return null

  return (
    <div className='p-4'>
      <Card className='flex flex-col gap-4 p-4'>
        <div className='text-default-600 flex justify-between items-center text-lg'>
          <MenuPayment
            title='Payment Strategies'
            filters={ filters }
            cells={ selectedCells }
            setFilters={ setFilters }
            applyFilters={ applyFilters }
            input={ search }
            setInput={ setSearch }
          />
        </div>

        <TableQueryContainer
          search={ debouncedSearch }
          setSearch={ setSearch }
        />
      </Card>
    </div>
  )
}