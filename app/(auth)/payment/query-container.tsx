'use client'

import { TableContainer } from './table-container'
import { Card } from '@heroui/card'
import MenuOptions from '@sec/menufilters'
import { useGetPayments } from '@api/routes/payment'
import { useTokenStore } from '@sts/useTokenStore'
import type { Column } from '@typ/home-tables'
import uuid4 from 'uuid4'
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
  { uid: 'capital', name: 'Capital' },
  { uid: 'interest', name: 'Interest' },
  { uid: 'due_date', name: 'Due Date' },
  { uid: 'pay_date', name: 'Payment Date' },
  { uid: 'company', name: 'Company' },
  { uid: 'pay_num', name: 'Payment' },
  { uid: 'actions', name: 'Actions' },
]

export const TableQueryContainer = () => {
  const options = [30, 40, 50]
  const { token, logout } = useTokenStore()

  const [mounted, setMounted] = useState(false)
  const [selected, setSelected] = useState<number>(30)
  const [current, setCurrent] = useState<number>(1)

  const { 
    data,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetPayments(token, { page_size: selected, page: current })

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
        setSelected={ setSelected }
      />
    )
  }

  if (!data?.results || data.results.length === 0)
    return <NoResults title='Loans' />

  const payments = data.results.map((payment) => ({
    ...payment,
    id: uuid4(),
  }))

  return (
    <Card className='flex flex-col gap-4 p-4'>
      <div className='text-default-600 flex justify-between items-center text-lg'>
        <MenuOptions
          title='All Payments'
          options={ options }
          selected={ selected }
          setSelected={ setSelected }
        />
      </div>

      <TableContainer
        data={ payments }
        columns={ columns }
      />

      <div className='w-full flex items-center justify-center'>
        <PaginationC
          total={ Math.floor(data.count / selected) }
          currentPage={ current }
          onPageChange={ setCurrent }
        />
      </div>
    </Card>
  )
}