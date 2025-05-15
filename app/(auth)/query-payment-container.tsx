'use client'

import { TableContainer } from './table-payment-container'
import { Card } from '@heroui/card'
import MenuOptions from '@sec/menufilters'
import { useGetPayments } from '@api/routes/payment'
import { useTokenStore } from '@sts/useTokenStore'
import type { Column, Loan, Payment } from '@typ/home-tables'
import { useMenuStorePayment } from '@sts/useMenuStore'
import { useDebounce } from '@uti/useDebounce'
import { generateCSV } from '@uti/csv'
import { generatePDF } from '@uti/pdf'
import {
  NoResults,
  LoadingComp,
} from '@uti/home-utils'
import {
  errorToast,
  PaginationC,
} from '@com/index'
import {
  useEffect,
  useState,
} from 'react'

const columns: Column[] = [
  { uid: 'id', name: 'ID' },
  { uid: 'name', name: 'Person Name' },
  { uid: 'status', name: 'Status' },
  { uid: 'amount', name: 'Amount' },
  { uid: 'interest', name: 'Interest' },
  { uid: 'due_date', name: 'Due Date' },
  { uid: 'pay_date', name: 'Payment Date' },
  { uid: 'company', name: 'Company' },
  { uid: 'pay_num', name: 'Payment' },
  { uid: 'actions', name: 'Actions' },
]

export default function PaymentTable() {
  const options = [4, 8, 12]

  const {
    search,
    setSearch,
    selectedCells,
  } = useMenuStorePayment()
  const { token, logout } = useTokenStore()
  const debouncedSearch = useDebounce(search, 500)

  const [mounted, setMounted] = useState(false)
  const [selected, setSelected] = useState<number>(8)
  const [current, setCurrent] = useState<number>(1)

  const { 
    data, 
    isLoading, 
    isFetching,
    isError, 
    error 
  } = useGetPayments(
    token,
    {
      page_size: selected,
      page: current,
      search: debouncedSearch,
    },
  )

  useEffect(() => {
    setMounted(true)
    if (isError) {
      console.log(error)
      errorToast({
        title: 'Error',
        body: 'Session expired or unexpected error. Please sign in again',
        duration: 5000,
      })
      logout()
    }
  }, [isError, error, logout])

  if (!mounted) return null

  if (isLoading || isFetching) {
    return (
      <LoadingComp
        title='Payments'
        columns={ columns }
        options={ options }
        selected={ selected }
        input={ search }
        setInput={ setSearch }
        setSelected={ setSelected }
      />
    )
  }

  const handlerDownload = (title: 'Loan' | 'Payment', data: Loan[] | Payment[], type: 'CSV' | 'PDF') => {
    if (type === 'CSV') generateCSV(title, data)
    else generatePDF(title, data)
  }

  if (!data?.results || data.results.length === 0) {
    return (
      <Card className='flex flex-col gap-4 p-4'>
        <div className='text-default-600 flex justify-between items-center text-lg'>
          <MenuOptions
            title='Payments'
            cells={ selectedCells }
            options={ options }
            selected={ selected }
            input={ search }
            setInput={ setSearch }
            setSelected={ setSelected }
            handlerDownload={ handlerDownload }
            page='Payment'
          />
        </div>

        <NoResults
          title='Payments'
          description='No results found'
        />
      </Card>
    )
  }

  const payments = data.results.map((payment) => ({
    ...payment,
    id: payment.loan_payment_id,
  }))

  return (
    <Card className='flex flex-col gap-4 p-4'>
      <div className='text-default-600 flex justify-between items-center text-lg'>
        <MenuOptions
          title='Payments'
          cells={ selectedCells }
          options={ options }
          selected={ selected }
          input={ search }
          setInput={ setSearch }
          setSelected={ setSelected }
          handlerDownload={ handlerDownload }
          page='Payment'
        />
      </div>

      <TableContainer
        data={ payments }
        columns={ columns }
      />

      <div className='w-full flex items-center justify-center'>
        <PaginationC
          total={ Math.ceil(data.count / selected) }
          currentPage={ current }
          onPageChange={ setCurrent }
        />
      </div>
    </Card>
  )
}