'use client'

import {
  useMemo,
  useState,
  useEffect,
  Key,
} from 'react'
import {
  Button,
  Chip,
  Selection,
} from '@heroui/react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@heroui/react'
import { 
  Loan, 
  Column,
} from '@typ/home-tables'
import Link from 'next/link'
import { CustomTable } from '@com/index'
import { VerticalDotsIcon } from '@uti/consts'
import { getStatusColor } from '@typ/loans-status'
import { SYSTEM_ROUTES } from '@api/cache'
import { format } from 'date-fns'
import { loanRequestStatus } from '@typ/loans-status'
import { cn } from '@uti/cn'
import { useMenuStoreLoan } from '@sts/useMenuStore'

type Props = {
  data: Loan[]
  columns: Column[]
}

const renderUserCell = (loans: Loan, columnKey: Key) => {
  switch (columnKey) {
    case 'id':
      return (
        <Link
          href={ SYSTEM_ROUTES.goToALoan(loans.loan_request_id) }
          className='text-blue-600 underline'
        >
          { loans.loan_request_id }
        </Link>
      )

    case 'customer':
      return (
        <Link
          href={ loans.customer_details_url }
          className='capitalize text-blue-600 underline w-full h-full overflow-hidden text-ellipsis whitespace-nowrap'
        >
          {`${loans.person.first_name} ${loans.person.last_name}`}
        </Link>
      )

    case 'approved_amount':
      return (
        <span className='text-theme-text-default w-full h-full overflow-hidden text-ellipsis whitespace-nowrap'>
          {`${loans.approved_amount} ${loans.currency.code}`}
        </span>
      )
    
    case 'request_date':
      return (
        <span className='text-theme-text-default w-full h-full overflow-hidden text-ellipsis whitespace-nowrap'>
          {
            loans.request_date
              ?
            format(loans.request_date, 'PP')
              :
            'No date'
          }
        </span>
      )

    case 'term':
      return (
        <span className='text-theme-text-default'>
          { loans.term }
        </span>
      )

    case 'status':
      return (
        <div className='max-w-[250px]'>
          <Chip
            className={
              cn(
                'w-full h-full overflow-hidden text-ellipsis whitespace-nowrap',
                getStatusColor(loans.status.unique_description)
              )
            }
          >
            { loanRequestStatus[loans.status.unique_description] }
          </Chip>
        </div>
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
            <DropdownItem
              key='view loan'
              as={ Link }
              href={ SYSTEM_ROUTES.goToALoan(loans.loan_request_id) }
            >
              View Loan
            </DropdownItem>

            <DropdownItem
              key='view payments'
              as={ Link }
              href={ SYSTEM_ROUTES.goToAPayment(loans.loan_request_id) }
            >
              View payments
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )

    default:
      return (loans as any)[columnKey as string]
  }
}

export const TableContainer = ({
  data,
  columns,
}: Props) => {
  const { setSelectedCells } = useMenuStoreLoan()

  const [filterValue, setFilterValue] = useState('')
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]))
  const visibleColumns = [
    'id',
    'customer',
    'approved_amount',
    'request_date',
    'term',
    'status',
    'actions',
  ]

  const selectedElements = useMemo(() => {
    return Array.from(selectedKeys).map((key) => Number(key))
  }, [selectedKeys])

  const handleSelectionChange = (keys: Selection) =>
    setSelectedKeys(keys)

  useEffect(() => {
    const selected = data.filter((el) => selectedElements.includes(el.id))
    setSelectedCells(selected)
    
    if (selectedKeys == 'all')
      setSelectedCells(data)
  }, [selectedElements])

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