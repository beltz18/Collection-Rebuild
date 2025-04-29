import { CustomTable } from '@com/index'
import { cn } from '@uti/cn'
import { useMemo, useState, useEffect, Key } from 'react'
import { Chip, Selection } from '@heroui/react'
import { ActivityLog, ColumnEx } from './types'
import { getStatusColor } from '@typ/payment-status'

type Props = {
  data: ActivityLog[]
  columns: ColumnEx[]
  currentPeriod?: {
    month: string
    week: string
  }
  onSelectionChange?: (keys: Set<number>) => void
}

const VerticalDotsIcon = ({
  size = 24,
  width,
  height,
  className,
  ...props
}: {
  size?: number
  width?: number
  height?: number
  className?: string
}) => {
  return (
    <svg
      aria-hidden='true'
      fill='none'
      focusable='false'
      height={size || height}
      role='presentation'
      viewBox='0 0 24 24'
      width={size || width}
      className={cn('', className)}
      {...props}
    >
      <path
        d='M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z'
        fill='currentColor'
      />
    </svg>
  )
}

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

const renderLogCell = (log: ActivityLog, columnKey: Key) => {
  switch (columnKey) {
    case 'status':
      return (
        <Chip
          className={getStatusColor(log.status === 'Success' ? 'PP' : 'PF')}
        >
          {log.status}
        </Chip>
      )

    case 'action':
      return <span className='font-medium'>{log.action}</span>

    case 'message':
      return <span className='text-sm'>{log.message}</span>

    case 'date':
      return (
        <span className='text-xs text-default-500'>
          {formatDateTime(log.date)}
        </span>
      )

    default:
      return (log as any)[columnKey as string]
  }
}

export const LogsTableContainer = ({
  data,
  columns,
  currentPeriod,
  onSelectionChange,
}: Props) => {
  const [filterValue, setFilterValue] = useState('')
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]))

  const visibleColumns = ['status', 'action', 'message', 'date']

  const selectedLogIds = useMemo(() => {
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
    const selectedLogs = data.filter((el) => selectedLogIds.includes(el.id))
    console.log(selectedLogs)
  }, [selectedLogIds, data])

  return (
    <div className='w-full flex flex-col gap-4'>
      {currentPeriod && (
        <div className='flex justify-between items-center'>
          <h3 className='text-lg font-semibold'>Activity Logs</h3>
          <span className='text-sm text-default-500'>
            showing logs for {currentPeriod.month} - {currentPeriod.week}
          </span>
        </div>
      )}

      <CustomTable
        columns={columns}
        data={data}
        filterValue={filterValue}
        visibleColumns={visibleColumns}
        selectedKeys={selectedKeys}
        renderCell={renderLogCell}
        onSearchChange={setFilterValue}
        onClearSearch={() => setFilterValue('')}
        onSelectionChange={handleSelectionChange}
      />
    </div>
  )
}
