'use client'

import { TableContainer } from './payments-table/table-container'
import { PaginationC } from '@com/pagination'
import { PaymentEx, ColumnEx } from '@typ/home-tables'
import { mockData } from './payments-table/mock/mock-data'
import { Status } from '@typ/payment-status'
import { format } from 'date-fns'
import { Heading } from '@com/heading'
import { Card } from '@heroui/card'
import MenuOptions from '@sec/menufilters'
import {
  useEffect,
  useState,
} from 'react'

const payments: PaymentEx[] = mockData.map((item) => ({
  id: item.loan_payment_id,
  personName: `${item.person.first_name} ${item.person.last_name}`,
  amount: `$${Number.parseFloat(item.amount).toFixed(2)}`,
  capital: `$${Number.parseFloat(item.capital).toFixed(2)}`,
  interestAmount: `$${Number.parseFloat(item.interest_amount).toFixed(2)}`,
  status: item.payment_status.unique_description as Status,
  statusName: item.payment_status.description,
  dueDate: item.due_date ? format(new Date(item.due_date), "PP") : "Not set",
  paymentDate: item.real_payment_date ? format(new Date(item.real_payment_date), "PP") : "Not paid yet",
  loanRequestNumber: item.loan_request_number,
  companyName: item.company_name,
  numberPayment: item.number_payment,
}))

const columns: ColumnEx[] = [
  { uid: 'id',       name: 'ID' },
  { uid: 'name', name: 'Person Name' },
  { uid: 'status',     name: 'Status' },
  { uid: 'amount',     name: 'Amount' },
  { uid: 'capital',   name: 'Capital' },
  { uid: 'interest',  name: 'Interest' },
  { uid: 'due_date',  name: 'Due Date' },
  { uid: 'pay_date',  name: 'Payment Date' },
  { uid: 'loan_num',  name: 'Loan Number' },
  { uid: 'company',  name: 'Company Name' },
  { uid: 'pay_num',  name: 'Payment Number' },
  { uid: 'actions',  name: 'Actions' },
]

export default function PaymentTable() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <>
      <Card className='flex flex-col gap-4 p-4'>
        <div className='text-default-600 flex justify-between items-center text-lg'>
          <MenuOptions title='Payments' />
        </div>
        <TableContainer
          data={ payments }
          columns={ columns }
        />
        <div className='w-full flex items-center justify-center'>
          <PaginationC total={ 55 } />
        </div>
      </Card>
    </>
  )
}