'use client'

import { TableContainer } from './loans-table/table-container'
import { Card } from '@heroui/card'
import MenuOptions from '@sec/menufilters'
import { useGetLoans } from '@api/routes/loan'
import { useTokenStore } from '@sts/useTokenStore'
import { SkeletonTable } from '@com/index'
import { ColumnEx } from '@typ/home-tables'
import {
  errorToast,
  PaginationC,
} from '@com/index'
import {
  useEffect,
  useState,
} from 'react'

const columns: ColumnEx[] = [
  { uid: 'loan_request_id', name: 'ID' },
  { uid: 'customer', name: 'Customer' },
  { uid: 'approved_amount', name: 'Approved' },
  { uid: 'request_date', name: 'Date' },
  { uid: 'term', name: 'Term' },
  { uid: 'status', name: 'Status' },
  { uid: 'actions', name: 'Actions' },
]

export default function LoansTable() {
  const { token, logout } = useTokenStore()

  const [mounted, setMounted] = useState(false)
  const [selected, setSelected] = useState<number>(8)
  const [current, setCurrent] = useState<number>(1)
  
  const {
    data,
    isLoading,
    isError,
    error
  } = useGetLoans(token, { page_size: selected, page: current })

  console.log(data, selected)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  if (isError) {
    console.log(error)
    errorToast({
      title: (error as any).response.data.error ?? 'Error',
      body: (error as any).response.data.message ?? 'Unexpected error. Logging out'
    })
    logout()
  }

  if (isLoading) {
    return (
      <Card className='flex flex-col gap-4 p-4'>
        <div className='text-default-600 flex justify-between items-center text-lg'>
          <MenuOptions
            title='Loans'
            options={[4, 8, 12]}
            selected={ selected }
            setSelected={ setSelected }
          />
        </div>
      
        <SkeletonTable
          columns={ columns }
          rows={ selected }
        />
      </Card>
    )
  }

  if (!data?.results || data.results.length === 0) return null

  return (
    <Card className='flex flex-col gap-4 p-4'>
      <div className='text-default-600 flex justify-between items-center text-lg'>
        <MenuOptions
          title='Loans'
          options={[4, 8, 12]}
          selected={ selected }
          setSelected={ setSelected }
        />
      </div>

      <TableContainer
        data={ data.results }
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