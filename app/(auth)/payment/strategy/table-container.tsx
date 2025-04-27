import { CustomTable } from '@com/index'
import { cn } from '@uti/cn'
import { useMemo, useState, useEffect, Key } from 'react'
import { Chip, Selection } from '@heroui/react'
import { PaymentStrategyEx, ColumnEx } from './types'

type Props = {
  data: PaymentStrategyEx[]
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

const renderUserCell = (payment: PaymentStrategyEx, columnKey: Key) => {
  switch (columnKey) {
    case 'name':
      return <span>{payment.name}</span>

    case 'status':
      return <Chip className={payment.status === 'active' ? getStatusColor('PP') : getStatusColor('PF')}>{payment.status}</Chip>

    case 'company':
      return <span>{payment.company || '-'}</span>

    case 'store':
      return <span>{payment.store || '-'}</span>

    case 'days_before_due':
      return <span>{payment.days_before_due}</span>

    case 'strict_mode':
      return <Chip className={payment.strict_mode ? getStatusColor('SP') : 'bg-neutral-100 text-default-600'}>{payment.strict_mode ? 'Yes' : 'No'}</Chip>

    case 'is_default':
      return <Chip className={payment.is_default ? getStatusColor('NTP') : 'bg-neutral-100 text-default-600'}>{payment.is_default ? 'Yes' : 'No'}</Chip>

    default:
      return (payment as any)[columnKey as string]
  }
}

export const TableContainer = ({ data, columns, onSelectionChange }: Props) => {
  const [filterValue, setFilterValue] = useState('')
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]))
  const visibleColumns = ['name', 'status', 'company', 'store', 'days_before_due', 'strict_mode', 'is_default']

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
