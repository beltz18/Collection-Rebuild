import { CustomTable } from '@com/index'
import { cn } from '@uti/cn'
import { useMemo, useState, useEffect, Key } from 'react'
import { Chip, Selection } from '@heroui/react'

import { PaymentEx, ColumnEx } from './types'

type Props = {
  data: PaymentEx[]
  columns: ColumnEx[]
  onSelectionChange?: (keys: Set<number>) => void
}
import { Status, getStatusColor } from '@typ/payment-status'

const VerticalDotsIcon = ({ size = 24, width, height, className, ...props }: { size?: number; width?: number; height?: number; className?: string }) => {
  return (
    <svg aria-hidden='true' fill='none' focusable='false' height={size || height} role='presentation' viewBox='0 0 24 24' width={size || width} className={cn('', className)} {...props}>
      <path d='M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z' fill='currentColor' />
    </svg>
  )
}

const renderUserCell = (payment: PaymentEx, columnKey: Key) => {
  switch (columnKey) {
    case 'name':
      return <span>{payment.name}</span>

    case 'description':
      return <span>{payment.description}</span>

    case 'processor_type':
      return <span>{payment.processor_type}</span>

    case 'status':
      return <Chip className={payment.status === 'active' ? getStatusColor('PP') : getStatusColor('PF')}>{payment.status}</Chip>

    case 'store_id':
      return <span>{payment.store_id}</span>

    case 'client_id':
      return <span>{payment.client_id}</span>

    case 'location_id':
      return <span>{payment.location_id}</span>

    default:
      return (payment as any)[columnKey as string]
  }
}

export const TableContainer = ({ data, columns, onSelectionChange }: Props) => {
  const [filterValue, setFilterValue] = useState('')
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]))
  const visibleColumns = ['name', 'description', 'processor_type', 'status', 'store_id', 'client_id', 'location_id']

  const selectedUserIds = useMemo(() => {
    return Array.from(selectedKeys).map((key) => Number(key))
  }, [selectedKeys])

  const handleSelectionChange = (keys: Selection) => {
    setSelectedKeys(keys)
    if (onSelectionChange) {
      const numericKeys = new Set(Array.from(keys).map((key) => Number(key)))
      onSelectionChange(numericKeys)
    }
  }

  useEffect(() => {
    const selectedUsers = data.filter((el) => selectedUserIds.includes(el.id))
    console.log(selectedUsers)
  }, [selectedUserIds])

  return (
    <div className='w-full'>
      <CustomTable
        columns={columns}
        data={data}
        filterValue={filterValue}
        visibleColumns={visibleColumns}
        selectedKeys={selectedKeys}
        renderCell={renderUserCell}
        onSearchChange={setFilterValue}
        onClearSearch={() => setFilterValue('')}
        onSelectionChange={handleSelectionChange}
      />
    </div>
  )
}
