'use client'

import { TableContainer } from './table-container'
import { PaginationC } from '@com/index'
import { mockData } from './mock/mock-data'
import { PaymentStrategyEx, ColumnEx } from './types'

type Props = {
  search?: string
  onSelectionChange?: (keys: Set<number>) => void
}

const paymentStrategies: PaymentStrategyEx[] = mockData.map((item) => ({
  id: item.id,
  name: item.name,
  status: item.active ? 'active' : 'inactive',
  company: item.company,
  store: item.branch ? `Branch ${item.branch}` : 'Main Store',
  days_before_due: item.days_before_due_to_start,
  strict_mode: item.strict_mode,
  is_default: item.default,
  create_date: item.create_date,
  update_date: item.update_date,
}))

const columns: ColumnEx[] = [
  { uid: 'name', name: 'Name', sortable: true },
  { uid: 'status', name: 'Status', sortable: true },
  { uid: 'company', name: 'Company ID', sortable: true },
  { uid: 'store', name: 'Store', sortable: true },
  { uid: 'days_before_due', name: 'Days Before Due', sortable: true },
  { uid: 'strict_mode', name: 'Mode', sortable: true },
  { uid: 'is_default', name: 'Default', sortable: true },
]

export const TableQueryContainer = ({ search, onSelectionChange }: Props) => {
  return (
    <div className='w-full flex items-center flex-col gap-4'>
      <TableContainer data={paymentStrategies} columns={columns} onSelectionChange={onSelectionChange} />
      <PaginationC total={paymentStrategies.length} />
    </div>
  )
}
