'use client'

import { TableContainer } from './table-container'
import { PaginationC } from '@com/index'
import { mockData } from './mock/mock-data'
import { PaymentEx, ColumnEx } from './types'

type Props = {
  search?: string
  onSelectionChange?: (keys: Set<number>) => void
}

const payments: PaymentEx[] = mockData.map((item) => ({
  id: item.id,
  name: item.name,
  description: item.description || '-',
  processor_type: item.processor_type,
  status: item.active ? 'active' : 'inactive',
  store_id: item.store_id || '-',
  client_id: item.client_id || '-',
  location_id: item.location_id || '-',
}))

const columns: ColumnEx[] = [
  { uid: 'name', name: 'Name', sortable: true },
  { uid: 'description', name: 'Description' },
  { uid: 'processor_type', name: 'Type', sortable: true },
  { uid: 'status', name: 'Status', sortable: true },
  { uid: 'store_id', name: 'Store ID' },
  { uid: 'client_id', name: 'Client ID' },
  { uid: 'location_id', name: 'Location ID' },
]

export const TableQueryContainer = ({ onSelectionChange }: Props) => {
  return (
    <div className='w-full flex items-center flex-col gap-4'>
      <TableContainer
        data={ payments }
        columns={ columns }
        onSelectionChange={ onSelectionChange }
      />
      <PaginationC total={ payments.length } />
    </div>
  )
}
