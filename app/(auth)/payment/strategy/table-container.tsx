'use client'

import { CustomTable } from '@com/index'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button
} from '@heroui/react'
import { VerticalDotsIcon } from '@uti/consts'
import { useMemo, useState, useEffect, type Key } from 'react'
import { Chip, type Selection } from '@heroui/react'
import type { ColumnEx } from './types'
import { StrategyT } from '@typ/strategy'

type Props = {
  data: StrategyT[]
  columns: ColumnEx[]
  onSelectionChange?: (keys: Set<number>) => void
}

const renderUserCell = (strategy: StrategyT, columnKey: Key) => {
  switch (columnKey) {
    case 'name':
      return <span>{ strategy.name }</span>

    case 'status':
      return (
        <Chip variant='flat' color={strategy.active ? 'success' : 'danger'}>
          { strategy.active ? 'Active' : 'Inactive' }
        </Chip>
      )

    case 'company':
      return <span>{ strategy.company || '-' }</span>

    case 'store':
      return <span>{ strategy.branch || '-' }</span>

    case 'days_before_due':
      return <span>{ strategy.days_before_due_to_start }</span>

    case 'strict_mode':
      return (
        <Chip
          variant='flat'
          color={ strategy.strict_mode ? 'warning' : 'default' }
        >
          { strategy.strict_mode ? 'Yes' : 'No' }
        </Chip>
      )

    case 'is_default':
      return (
        <Chip
          variant='flat'
          color={ strategy.default ? 'primary' : 'default' }
        >
          { strategy.default ? 'Yes' : 'No' }
        </Chip>
      )

    case 'actions':
      return (
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly size='sm' variant='light'>
              <VerticalDotsIcon className='text-default-300' />
            </Button>
          </DropdownTrigger>

          <DropdownMenu>
            <DropdownItem key='view'>View steps</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )

    default:
      return (strategy as any)[columnKey as string]
  }
}

export const TableContainer = ({ data, columns, onSelectionChange }: Props) => {
  const [filterValue, setFilterValue] = useState('')
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]))
  const visibleColumns = [
    'name',
    'status',
    'company',
    'store',
    'days_before_due',
    'strict_mode',
    'is_default',
    'actions'
  ]

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
    const selectedStrategies = data.filter((el) =>
      selectedUserIds.includes(el.id)
    )
    console.log('Selected strategies:', selectedStrategies)
  }, [selectedUserIds, data])

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
