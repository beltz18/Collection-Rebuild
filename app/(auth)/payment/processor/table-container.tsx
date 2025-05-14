import {
  useMemo,
  useState,
  useEffect,
  Key,
} from 'react'
import {
  Chip,
  Selection,
} from '@heroui/react'
import { CustomTable } from '@com/index'
import { ProcessorT } from '@typ/processor'
import { useSelected } from '@sts/useSelectedStore'
import { ColumnEx } from './types'

type Props = {
  data: ProcessorT[]
  columns: ColumnEx[]
}

const renderUserCell = (payment: ProcessorT, columnKey: Key) => {
  switch (columnKey) {
    case 'name':
      return (
        <span className='text-theme-text-default'>
          { payment.name || '-' }
        </span>
      )

    case 'description':
      return (
        <span className='text-theme-text-default'>
          { payment.description || '-' }
        </span>
      )

    case 'processor_type':
      return (
        <span className='text-theme-text-default capitalize'>
          { payment.processor_type || '-' }
        </span>
      )

    case 'status':
      return (
        <Chip
          variant='flat'
          color={ payment.active ? 'success' : 'danger' }
        >
          { payment.active ? 'Active' : 'Inactive' }
        </Chip>
      )

    case 'store_id':
      return (
        <span className='text-theme-text-default'>
          { payment.store_id || '-' }
        </span>
      )

    case 'client_id':
      return (
        <span className='text-theme-text-default'>
          { payment.client_id || '-' }
        </span>
      )

    case 'location_id':
      return (
        <span className='text-theme-text-default'>
          { payment.location_id || '-' }
        </span>
      )

    default:
      return (payment as any)[columnKey as string]
  }
}

export const TableContainer = ({ data, columns }: Props) => {
  const { setSelectedCellsP } = useSelected()

  const [filterValue, setFilterValue] = useState('')
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]))
  const visibleColumns = [
    'name',
    'description',
    'processor_type',
    'status',
    'store_id',
    'client_id',
    'location_id',
  ]

  const selectedUserIds = useMemo(() => {
    return Array.from(selectedKeys).map((key) => Number(key))
  }, [selectedKeys])

  const handleSelectionChange = (keys: Selection) => setSelectedKeys(keys)

  useEffect(() => {
    const selectedProcessors = data.filter((el) => selectedUserIds.includes(el.id))
    console.log('Selected processor:', selectedProcessors)
    // if (selectedKeys == 'all') 
      setSelectedCellsP(selectedProcessors)
  }, [selectedUserIds])

  return (
    <div className='w-full'>
      <CustomTable
        columns={ columns }
        data={ data }
        filterValue={ filterValue }
        visibleColumns={ visibleColumns }
        selectedKeys={ selectedKeys }
        renderCell={ renderUserCell }
        onSearchChange={ setFilterValue }
        onClearSearch={() => setFilterValue('')}
        onSelectionChange={ handleSelectionChange }
      />
    </div>
  )
}
