import { CustomTable } from '@com/index'
import { useMemo, useState, useEffect, Key } from 'react'
import { Chip, Selection } from '@heroui/react'
import { ProcessorT } from '@typ/processor'
import { ColumnEx } from './types'

type Props = {
  data: ProcessorT[]
  columns: ColumnEx[]
  onSelectionChange?: (keys: Set<number>) => void
}

const renderUserCell = (payment: ProcessorT, columnKey: Key) => {
  switch (columnKey) {
    case 'name':
      return <span>{payment.name || "-"}</span>

    case 'description':
      return <span>{payment.description || "-"}</span>

    case 'processor_type':
      return <span>{payment.processor_type || "-"}</span>

    case 'status':
      return <Chip variant="flat" color={payment.active ? "success" : "danger"}>{payment.active ? "Active" : "Inactive"}</Chip>

    case 'store_id':
      return <span>{payment.store_id || "-"}</span>

    case 'client_id':
      return <span>{payment.client_id || "-"}</span>

    case 'location_id':
      return <span>{payment.location_id || "-"}</span>

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
