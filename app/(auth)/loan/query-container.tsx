'use client'

import { TableContainer } from './table-container'
import { Card } from '@heroui/card'
import MenuOptions from '@sec/menufilters'
import { useGetLoans } from '@api/routes/loan'
import { useTokenStore } from '@sts/useTokenStore'
import { Column } from '@typ/home-tables'
import { useMenuStoreLoan } from '@sts/useMenuStore'
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
  { uid: 'customer', name: 'Customer' },
  { uid: 'approved_amount', name: 'Approved' },
  { uid: 'request_date', name: 'Date' },
  { uid: 'term', name: 'Term' },
  { uid: 'status', name: 'Status' },
  { uid: 'actions', name: 'Actions' },
]

export const TableQueryContainer = () => {
  const options = [30, 40, 50]

  const { selectedCells } = useMenuStoreLoan()
  const { token, logout } = useTokenStore()

  const [mounted, setMounted] = useState(false)
  const [selected, setSelected] = useState<number>(30)
  const [current, setCurrent] = useState<number>(1)

  const {
    data,
    isLoading,
    isFetching,

    isError,
    error
  } = useGetLoans(token, { page_size: selected, page: current })
  
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
        title='Loans'
        columns={ columns }
        options={ options }
        selected={ selected }
        setSelected={ setSelected }
      />
    )
  }

  if (!data?.results || data.results.length === 0)
    return <NoResults title='Loans' />

  const loans = data.results.map((loan) => ({
    ...loan,
    id: loan.loan_request_id,
  }))

  return (
    <Card className='flex flex-col gap-4 p-4'>
      <div className='text-default-600 flex justify-between items-center text-lg'>
        <MenuOptions
          title='Loans'
          cells={ selectedCells }
          options={ options }
          selected={ selected }
          setSelected={ setSelected }
        />
      </div>

      <TableContainer
        data={ loans }
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