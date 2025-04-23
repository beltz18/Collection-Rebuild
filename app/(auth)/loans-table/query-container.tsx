'use client'

import { TableContainer } from './table-container'
import { PaginationC } from '@com/index'
import { format } from "date-fns"
import { mockData } from './mock/mock-data'
import { LoanRequestStatus } from '@typ/loans-status'
import { 
  LoanEx, 
  ColumnEx 
} from '@typ/home-tables'

type Props = {
  search?: string
}

const loans: LoanEx[] = mockData.map((item) => ({
  id: item.loan_request_id,
  customer: item.person.first_name + ' ' + item.person.last_name,
  date: `${format(new Date(item.request_date), "PP")}`,
  term: item.term.toString(),
  status: item.status.unique_description as LoanRequestStatus,
  statusName: item.status.description,
  requested: `${item.currency.code} ${Number.parseFloat(item.requested_amount).toFixed(2)}`,
  approved: `${item.currency.code} ${Number.parseFloat(item.approved_amount).toFixed(2)}`,
}))

const columns: ColumnEx[] = [
  { uid: 'id',       name: 'ID' },
  { uid: 'customer', name: 'Customer' },
  { uid: 'date',     name: 'Date' },
  { uid: 'term',     name: 'Term' },
  { uid: 'status',   name: 'Status' },
  { uid: 'actions',  name: 'Actions' },
]

export const TableQueryContainer = ({ search }: Props) => {
  return (
    <div className='w-full flex items-center flex-col gap-4'>
      <TableContainer
        data={ loans }
        columns={ columns }
      />
      <PaginationC total={ 98 } />
    </div>
  )
}