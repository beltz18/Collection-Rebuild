'use client'

import { TableContainer } from './loans-table/table-container'
import { PaginationC } from '@com/index'
import { LoanEx, ColumnEx } from '@typ/home-tables'
import { mockData } from './loans-table/mock/mock-data'
import { LoanRequestStatus } from '@typ/loans-status'
import { format } from 'date-fns'
import { Heading } from '@com/heading'
import { Card } from '@heroui/card'
import MenuOptions from '@sec/menufilters'
import {
  useEffect,
  useState,
} from 'react'

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

export default function LoansTable() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <>
      <Card className='flex flex-col gap-4 p-4'>
        <div className='text-default-600 flex justify-between items-center text-lg'>
          <MenuOptions title='Loans' />
        </div>
        <TableContainer
          data={ loans }
          columns={ columns }
        />
        <div className='w-full flex items-center justify-center'>
          <PaginationC total={ 98 } />
        </div>
      </Card>
    </>
  )
}